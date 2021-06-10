// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはFeed.jsxからもらいます(propsで)

import React from 'react';
import { db, storage } from '../firebase';


// propsを受け取る
const Post = ({ id, name, bday, image, timestamp}) => {

    // 削除ボタンの処理
    const deleteInputData = () =>{
        db.collection("group").doc(id).delete();
        storage.ref(`images/${image}`).delete();
    }

    return (
        <div>
            {/* name/bdayが渡ってくる */}
            <div>{name}</div>
            <div>{bday}</div>

            {/* imageを表示させる */}
            <div><img src={image} alt="" width="200px" height="auto" /></div>

            {/* 登録日を表示 */}
            <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>
            <button onClick={deleteInputData}>削除</button> 
            <hr />        
        </div>
    )
}

export default Post
