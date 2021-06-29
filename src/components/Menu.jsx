import React from 'react'
import "./style.css"
import "./styleSP.css"
import "bootstrap/dist/css/bootstrap.min.css"
import MediaQuery from 'react-responsive'
import { auth } from '../firebase'
import namunamu from '../img/menu/namunamu.png'
import touroku from '../img/menu/touroku.png'
import senzo from '../img/menu/senzo.png'
import logout from '../img/menu/logout.png'


const Menu = (props) => {
    return (
        <>
        <MediaQuery query="(max-width:576px)">
        <div class="menuBgSP">
            <div class="row row-cols-4">
                <div class="colSP"><a href="/"><img src={namunamu} width="100%" alt="menu_namunamu" /></a></div>
                <div class="col"><a href="/regi"><img src={touroku} width="100%" alt="menu_touroku" /></a></div>
                <div class="col"><a href="/list"><img src={senzo} width="100%" alt="menu_senzo" /></a></div>
                <div class="col"><a onClick={
                        async () => {
                            try {
                            await auth.signOut();
                            props.history.push("/"); //ここでログアウトして飛ばしたいページに戻す
                            } catch (error) {
                            console.log("error.message")
                            // alert(error.message);
                            }
                        }}><img src={logout} width="100%" alt="menu_logout" /></a></div>
            </div>
        </div>
        </MediaQuery>
        <MediaQuery query="(min-width:577px)">
        <div className="menuBg">
        <div class="row row-cols-4">
                <div class="col"><a href="/"><img src={namunamu} width="65%" alt="menu_namunamu" /></a></div>
                <div class="col"><a href="/regi"><img src={touroku} width="65%" alt="menu_touroku" /></a></div>
                <div class="col"><a href="/list"><img src={senzo} width="65%" alt="menu_senzo" /></a></div>
                <div class="col"><a onClick={
                        async () => {
                            try {
                            await auth.signOut();
                            props.history.push("/"); //ここでログアウトして飛ばしたいページに戻す
                            } catch (error) {
                            console.log("error.message")
                            // alert(error.message);
                            }
                        }}><img src={logout} width="65%" alt="menu_logout" /></a></div>
            </div>
        </div>
        </MediaQuery>

        </>
    )
}

export default Menu
