// 登録した人たちのリスト

import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import Menu from './Menu';
import Post from './Post'


const Feed = (props) => {
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


    // firebaseに登録したデータを受け取るための箱=useState
    const [ group, setGroup ] = useState([
        { 
            id:"",
            image: "",
            name:"",
            bday: "",
            timestamp: null,
        }
    ])

    // firebaseのデータを取得する（useEffect）
    useEffect(() =>{
        const firebaseData = db
        .collection("group")
        .orderBy("timestamp", "desc")   // 登録した日時(timestamp)の降順？昇順？で並べてね
        .onSnapshot((snapshot) =>
            setGroup(
                snapshot.docs.map((doc) => ({   // 「docs」はfirebaseの用語、「doc」は「docs」のなかの1件ずつのこと
                    id: doc.id,
                    image: doc.data().image,
                    name: doc.data().name,
                    bday: doc.data().bday,
                    timestamp: doc.data().timestamp,
                }))
                )
        )
        return () => {
            firebaseData();
        }
    },[])

    // console.log("中身確認",group)



    return (
        <div className="App">
            <Menu />
            {/* Post.jsxにpropsの情報を渡す＆Post.jsで整えた表示方法で、またここで表示させる */}
            {group.map((groupItem) =>(
                <Post
                    key={groupItem.id}
                    id={groupItem.id}
                    image={groupItem.image}
                    name={groupItem.name}
                    bday={groupItem.bday}
                    timestamp={groupItem.timestamp}
                />
            ))}
            
        </div>
    )
}

export default Feed
