import React from 'react'
import { auth } from '../firebase'

const Logout = (props) => {
    return (
        <div>
            <button
                onClick={async () => {
                try {
                await auth.signOut();
                props.history.push("login"); //ここでログアウトして飛ばしたいページに戻す
                } catch (error) {
                alert(error.message);
                }
            }}
            >
            ログアウトボタン
            </button>
        </div>
    )
}

export default Logout
