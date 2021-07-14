// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはList.jsxからもらいます(propsで)

import React from 'react';
import { db, storage } from '../firebase';
import MediaQuery from 'react-responsive'
import "bootstrap/dist/css/bootstrap.min.css"


// propsを受け取る
const Post = ({ id, name, relation, bday, dday, image, uid, timestamp}) => {

    // 削除ボタンの処理
    const deleteInputData = () =>{
        db.collection("group").doc(id).delete();
        storage.ref(`images/${image}`).delete();
    }

    return (
        <>
        <MediaQuery query="(max-width:576px)">
        <div className="postCard">
            <div className="postBox">
                <img src={image} className="postImage" style={{height: '100%'}} />
                <div className="postTextArea">
                    <span class="postTitle">{name}</span>
                    <span class="postContent">{relation}</span><br />
                    <span class="postContent">誕生日：{bday}</span><br />
                    <span class="postContent">命日：{dday}</span><br />
                    <span class="postDelete" onClick={deleteInputData}>削除</span>
                </div>
            </div>
        </div>
        </MediaQuery>


      <MediaQuery query="(min-width:577px)">
      <div className="postCard">
            <div className="postBox">
                <img src={image} className="postImage" style={{height: '100%'}} />
                <div className="postTextArea">
                    <span class="postTitle">{name}</span>
                    <span class="postContent">{relation}</span><br />
                    <span class="postContent">誕生日：{bday}</span><br />
                    <span class="postContent">命日：{dday}</span><br />
                    <span class="postDelete" onClick={deleteInputData}>削除</span>
                </div>
            </div>
        </div>
        </MediaQuery>
        </>
    )
}

export default Post
