// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはList.jsxからもらいます(propsで)

import React from 'react';
import '../App.css';
import "./style.css";

// propsを受け取る
const Post = ({ id, name, image}) => {

    return (
        <div className="topFaceDate">
            <img src={image} alt="" className="topFaceImage" /> 
            <div className="topFaceName">
                {name}
            </div>
        </div>
    )
}

export default Post
