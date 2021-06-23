// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはList.jsxからもらいます(propsで)

import React from 'react';
import '../App.css';
import "./style.css";

// propsを受け取る
const Post = ({ id, name, image}) => {

    return (
        <div>
        <div className="topFaceContainer">
            {/* imageを表示させる */}
            <div className="topFaceDate">
                <div><img src={image} alt="" width="200px" height="auto"  className="topFaceImage" /></div>
                {/* name/bdayが渡ってくる */}
                <div className="topFaceName">{name}</div>
            </div>
        </div>
        </div>
    )
}

export default Post
