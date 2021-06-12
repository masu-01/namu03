import React from 'react'
import { auth } from '../firebase'
import "./style.css"

const Logout = (props) => {
    return (
        <div>
            <button
                className="logoutButton"
                onClick={async () => {
                try {
                await auth.signOut();
                props.history.push("login"); //ここでログアウトして飛ばしたいページに戻す
                } catch (error) {
                alert(error.message);
                }
            }}
            >
            ログアウト
            </button>
        </div>
    )
}

export default Logout
