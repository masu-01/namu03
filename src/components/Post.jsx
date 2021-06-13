// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはList.jsxからもらいます(propsで)

import React from 'react';
import { db, storage } from '../firebase';


// propsを受け取る
const Post = ({ id, name, relation, bday, dday, image, timestamp}) => {

    // 削除ボタンの処理
    const deleteInputData = () =>{
        db.collection("group").doc(id).delete();
        storage.ref(`images/${image}`).delete();
    }

    return (
        <div>
            {/* imageを表示させる */}
            <div><img src={image} alt="" width="200px" height="auto" /></div>

            {/* name/bdayが渡ってくる */}
            <div>なまえ：{name}</div>
            <div>続柄：{relation}</div>
            <div>誕生日：{bday}</div>
            <div>命日：{dday}</div>

            {/* 登録日を表示 */}
            {/* <div>{new Date(timestamp?.toDate()).toLocaleString()}</div> */}

            <button onClick={deleteInputData}>削除</button> 
            <hr />        
        </div>
    )
}

export default Post
