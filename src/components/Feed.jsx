// 授業4
// firebaseのデータを取得してPost.jsxにデータを流す
// データ流したPost.jsxを読み込んでここで表示する

import React, { useState, useEffect } from 'react'
import {db} from '../firebase'
import Post from './Post'
import TweetInput from './TweetInput'


const Feed = () => {
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
        .orderBy("timestamp", "desc")
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

    console.log("中身確認",group)



    return (
        <div>
            {/* TweetInput.jsxを表示させる */}
            <TweetInput />
            <hr />


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
