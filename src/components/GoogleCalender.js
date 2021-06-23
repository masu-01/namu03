import React,{ useState, useEffect }from 'react';
import { auth } from '../firebase';
import ApiCalendar from 'react-google-calendar-api';


const GoogleCalender = (props) => {
    // UID取得＝＝＝＝＝＝
    const [currentUser, setCurrentUser] = useState("")
    auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        });
    console.log(currentUser.uid)
    console.log(currentUser.providerId)
    console.log(currentUser.email)
    console.log(currentUser.displayName)
    // ＝＝＝＝＝＝＝＝＝＝＝

    // ==ログイン認証セット===================================================
    useEffect(() => {
        // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
        // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
        const unSub = auth.onAuthStateChanged((user) => {
        // あるときは user = true ,
        // ないときは !user = false
        // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
        !user && props.history.push("login");
        });
        return () => unSub();
    }, []);
    // ==ログイン認証セット===================================================

    // プロバイダ別のプロフィールを取る
    // const gUser = auth().currentUser;

    // if (gUser != null) {
    //     gUser.providerData.forEach(profile => {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    // });
    // }


    const getEvents = async () => {
        return new Promise(async (resolve, reject) => {
          // 2.認証チェック
          if (currentUser) {
             // 3.イベントの取得
             ApiCalendar.listEvents({
                timeMin: new Date().toISOString(),
                timeMax: new Date().addDays(10).toISOString(),
                showDeleted: true,
                maxResults: 10,
                orderBy: 'updated'
              }).then(({ result }) => {
                if (result.items) {
                  console.log("Events From Calendar", result.items);
                } else {
                  console.log("No Events")
                }
    
                resolve(result);
              });
          } else {
              console.log("認証できてないです")
            // 2’.認証していなければOAuth認証
            ApiCalendar.handleAuthClick();
    
            resolve(null);
          }
        })
    };


    return (
        <div className="App">
            <p>a</p>
            <button onclick={() => getEvents()}>Get Events</button>
        </div>
    )
}


export default GoogleCalender
