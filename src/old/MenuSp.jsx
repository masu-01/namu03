import React from 'react'
// import "./style.css"
import { auth } from '../firebase'
import namunamu from '../img/menu/namunamu.png'
import touroku from '../img/menu/touroku.png'
import senzo from '../img/menu/senzo.png'
import logout from '../img/menu/logout.png'


const Menu = (props) => {
    return (
        <div className="">
            <nav>
                <ul>
                    <li><a href="/"><img src={namunamu} width="100%" alt="menu_namunamu" /></a></li>
                    <li><a href="/regi"><img src={touroku} width="100%" alt="menu_touroku" /></a></li>
                    <li><a href="/list"><img src={senzo} width="100%" alt="menu_senzo" /></a></li>
                    <li><a onClick={
                        async () => {
                            try {
                            await auth.signOut();
                            props.history.push("/"); //ここでログアウトして飛ばしたいページに戻す
                            } catch (error) {
                            console.log("error.message")
                            // alert(error.message);
                            }
                        }}><img src={logout} width="100%" alt="menu_logout" /></a></li>
                </ul>
            </nav>
            {/* <hr /> */}
        </div>
    )
}

export default Menu
