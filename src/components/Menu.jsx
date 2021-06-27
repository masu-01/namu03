import React from 'react'
import "./style.css"
import { auth } from '../firebase'
import namunamu from '../img/menu/namunamu.png'
import touroku from '../img/menu/touroku.png'
import senzo from '../img/menu/senzo.png'
import logout from '../img/menu/logout.png'


const Menu = (props) => {
    return (
        <div className="menuBg">
            <nav>
                <ul>
                    <li><a href="/"><img src={namunamu} width="120px" alt="menu_namunamu" /></a></li>
                    <li><a href="/regi"><img src={touroku} width="120px" alt="menu_touroku" /></a></li>
                    <li><a href="/list"><img src={senzo} width="120px" alt="menu_senzo" /></a></li>
                    <li><a onClick={
                        async () => {
                            try {
                            await auth.signOut();
                            props.history.push("/"); //ここでログアウトして飛ばしたいページに戻す
                            } catch (error) {
                            alert("error.message")
                            // alert(error.message);
                            }
                        }}><img src={logout} width="120px" alt="menu_logout" /></a></li>
                </ul>
            </nav>
            {/* <hr /> */}
        </div>
    )
}

export default Menu
