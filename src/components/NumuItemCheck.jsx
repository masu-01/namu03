import React,{ useState } from 'react'
import {Link} from "react-router-dom"
import ReactDOM from "react-dom";
import { motion, useAnimation } from "framer-motion";
import Modal from 'react-modal'
import { db, auth} from '../firebase';
import firebase from 'firebase/app';
import Menu from './Menu'
import kiku from "../img/flower/kiku.png"
import sakura from "../img/flower/sakura.png"
import cosmos from "../img/flower/cosmos.png"
import himawari from "../img/flower/himawari.png"
import garbela from "../img/flower/garbela.png"
import bara from "../img/flower/bara.png"
import beer from "../img/drink/beer.png"
import coffee from "../img/drink/coffee.png"
import mizu from "../img/drink/mizu.png"
import sake from "../img/drink/sake.png"
import tea from "../img/drink/tea.png"
import standard from "../img/bell/standard.png"
import kane from "../img/bell/kane.png"
import bell02 from "../img/bell/bell02.png"

Modal.setAppElement("#root");

const NumuItemCheck = ({flower,drink,bell}) => {
    // UID取得＝＝＝＝＝＝
    const [currentUser, setCurrentUser] = useState("")
    auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        });
    // ＝＝＝＝＝＝＝＝＝＝＝

    const [modalIsOpen, setIsOpen] = useState(false);


    const sendNamuSet = (e) => {
        // console.log(flower)
        
        db.collection("namulog").add({
            image:"",
            flower: flower,
            drink: drink,
            // img: image,
            bell: bell,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: currentUser.uid,
        })
        
    }

    return (
        <div>
            {/* 選択したアイテムの確認 */}
            <div>
                <div className="btnWrapGoogle">
                    <button onClick={() => 
                        setIsOpen(true)
                        } className="btnImageGoogle">確認する</button>
                </div>

                <Modal isOpen={modalIsOpen} className="modalContainer">
                    
                    <span className="itemCheckItem">
                        {flower == "ばら" && <img src={bara} className="itemCheckImg" />}
                        {flower == "きく" && <img src={kiku} className="itemCheckImg" />}
                        {flower == "さくら" && <img src={sakura} className="itemCheckImg" />}
                        {flower == "がーべら" && <img src={garbela} className="itemCheckImg" />}
                        {flower == "こすもす" && <img src={cosmos} className="itemCheckImg" />}
                        {flower == "ひまわり" && <img src={himawari} className="itemCheckImg" />}
                    </span>
                    <span className="itemCheckItem">
                        {drink == "みず" && <img src={mizu} className="itemCheckImg" />}
                        {drink == "さけ" && <img src={sake} className="itemCheckImg" />}
                        {drink == "こーひー" && <img src={coffee} className="itemCheckImg" />}
                        {drink == "びーる" && <img src={beer} className="itemCheckImg" />}
                        {drink == "おちゃ" && <img src={tea} className="itemCheckImg" />}
                    </span>
                    <span className="itemCheckItem">
                        {bell == "ふつう" && <img src={standard} className="itemCheckImg" />}
                        {bell == "かね" && <img src={kane} className="itemCheckImg" />}
                        {bell == "べる" && <img src={bell02} className="itemCheckImg" />}
                    </span>
                    <div className="btnWrapGoogle">
                        <Link to="/" className="btnImageGoogle" onClick={sendNamuSet}>決定する</Link>
                    </div>
                    {/* <button onClick={() => window.location.href='/'}>決定する</button> */}

                    <div className="btnWrapGoogle">
                    <button className="btnBack" onClick={() => setIsOpen(false)}>戻る</button>
                    </div>
                    
                </Modal>
            </div>

        </div>
    )
}

export default NumuItemCheck
