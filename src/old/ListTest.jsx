// 登録した人たちのリスト

import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import Menu from '../components/Menu'
import Post from '../components/Post'

const ListTest = (props) => {
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

    // UID取得＝＝＝＝＝＝
        const [currentUser, setCurrentUser] = useState("")
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            });
        const userId = currentUser.uid
        // console.log(currentUser.uid)
    // ＝＝＝＝＝＝＝＝＝＝＝    

    // firebaseに登録したデータを受け取るための箱=useState
    const [ group, setGroup ] = useState([
        { 
            id:"",
            image: "",
            name:"",
            relation:"",
            bday: "",
            dday: "",
            uid: "",
            timestamp: null,
        }
    ])


    // firebaseのデータを取得する（useEffect）
    useEffect(() =>{
        console.log("useEffectの",userId)
        const uid = userId
        if(uid != null){
            const firebaseData = db
            .collection("group")
            .where("uid", "==", uid)
            .onSnapshot((snapshot) =>
            setGroup(
                snapshot.docs.map((doc) => ({   // 「docs」はfirebaseの用語、「doc」は「docs」のなかの1件ずつのこと
                    id: doc.id,
                    image: doc.data().image,
                    name: doc.data().name,
                    relation: doc.data().relation,
                    bday: doc.data().bday,
                    dday: doc.data().dday,
                    uid: doc.data().uid,
                    timestamp: doc.data().timestamp,
                }))
                )
        )
            return () => {
                firebaseData();
            }
    }
    },[currentUser.uid])


    return (
        <div className="App">
            <Menu />
      {/* UID取れてるか確認 */}
      <span>ログインUID:{currentUser.uid}</span>

            {/* Post.jsxにpropsの情報を渡す＆Post.jsで整えた表示方法で、またここで表示させる */}
            {group.map((groupItem) =>(
                <Post
                    key={groupItem.id}
                    id={groupItem.id}
                    image={groupItem.image}
                    name={groupItem.name}
                    relation={groupItem.relation}
                    bday={groupItem.bday}
                    dday={groupItem.dday}
                    uid={groupItem.uid}
                    timestamp={groupItem.timestamp}
                />
            ))}
            
        </div>
    )
}

export default ListTest
