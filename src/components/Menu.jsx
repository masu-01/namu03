import React from 'react'
import Logout from './Logout'
import "./style.css"

const Menu = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><a className="current" href="/">なむ</a></li>
                    <li><a href="/regi">登録</a></li>
                    <li><a href="/list">リスト</a></li>
                    <li><Logout /></li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu
