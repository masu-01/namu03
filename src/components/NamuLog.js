import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import NamuLogDispley from './NamuLogDispley'

const NamuLog = () => {
    // UID取得＝＝＝＝＝＝
        const [currentUser, setCurrentUser] = useState("")
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            });
        // const userId = currentUser.uid
        // console.log(currentUser.uid)
    // ＝＝＝＝＝＝＝＝＝＝＝

    // firebaseに登録したデータを受け取るための箱=useState
    const [ namulog, setNamulog ] = useState([
        { 
            id:"",
            image: "",
            flower:"",
            drink:"",
            smoke: "",
            bell: "",
            uid: "",
            timestamp: null,
        }
    ])

    // const timestampDate = db.collection("namulog")
    // console.log("たいむすたんぷ！",timestampDate)

    // firebaseのデータを取得する（useEffect）
    useEffect(() =>{
        // console.log("useEffectの",currentUser.uid)
        const uid = currentUser.uid

        if(uid != null){
            const firebaseData = db
            .collection("namulog")
            .where("uid", "==", uid)
            // .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
            setNamulog(
                snapshot.docs.map((doc) => ({   // 「docs」はfirebaseの用語、「doc」は「docs」のなかの1件ずつのこと
                    id: doc.id,
                    flower: doc.data().flower,
                    drink: doc.data().drink,
                    smoke: doc.data().smoke,
                    bell: doc.data().bell,
                    uid: doc.data().uid,
                    timestamp: doc.data().timestamp.toDate,
                }))
                )
            )
            return () => {
                firebaseData();
            }
        }
    },[currentUser])        //ここが怪しい

    console.log(namulog)

    return (
        <div className="App">
            {/* NamuLogDispley.jsにpropsの情報を渡す＆NamuLogDispley.jsで整えた表示方法で、またここで表示させる */}
            {namulog.map((namulogItem) =>(
                <NamuLogDispley
                    key={namulogItem.id}
                    id={namulogItem.id}
                    flower={namulogItem.flower}
                    drink={namulogItem.drink}
                    smoke={namulogItem.smoke}
                    bell={namulogItem.bell}
                    uid={namulogItem.uid}
                    timestamp={namulogItem.timestamp}
                />
            ))}
        </div>
    )
}

export default NamuLog
