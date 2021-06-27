import React,{ useState, useEffect }from 'react';
import { auth } from '../firebase';


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


    return (
        <div className="App">
            <p>a</p>
        </div>
    )
}


export default GoogleCalender
