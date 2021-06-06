// 授業3
// 表示エリアをコンポーネント化する

import React from 'react'
import {db} from '../firebase'


// propsでidとタイトルを上から渡して、ここで受け取れるようにする
const TaskItem = ({id, name, bday}) => {

    // 削除ボタンの処理
    const deleteInputData = () =>{
        db.collection("group").doc(id).delete();
    }

    return (
        <div>
            {/* 表示 */}
            <div>{name} : {bday}</div>
            {/* 削除ボタン */}
            <button onClick={deleteInputData}>削除</button>
        </div>
    )
}

export default TaskItem
