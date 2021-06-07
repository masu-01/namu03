// 授業4
// firebaseの登録データをここに流し込んで表示するテンプレートです
// 表示するデータはFeed.jsxからもらいます(propsで)

import React from 'react';

// propsを受け取る
const Post = ({name, bday, image, timestamp}) => {
    return (
        <div>
            {/* name/bdayが渡ってくる */}
            <div>{name}</div>
            <div>{bday}</div>

            {/* imageを表示させる */}
            <div><img src={image} alt="" /></div>

            {/* 登録日を表示 */}
            <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>            
        </div>
    )
}

export default Post
