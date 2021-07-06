import React,{ useState } from 'react'
import {Link} from "react-router-dom"
import Modal from 'react-modal'
import { db, storage, auth } from '../firebase';
import firebase from 'firebase/app';
import "./style.css"

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

const NumuItemCheck02 = ({flower,drink,bell,image}) => {
    console.log("image",image)

    // UID取得＝＝＝＝＝＝
    const [currentUser, setCurrentUser] = useState("")
    auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        });
    // ＝＝＝＝＝＝＝＝＝＝＝

    const [modalIsOpen, setIsOpen] = useState(false);

    const sendNamuSet = (e) => {
        // useStateで保持した変数を確認
        console.log(image);
        // formタグを使うと送信の際にリフレッシュされます（画面がリロードされるということ）
        // formタグを使う時は必須！絶対入ります！
        e.preventDefault();

    if (image) {
        // 画像 + テキストを登録させる
        // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
        // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
        const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
        const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomMoji + "_" + image.name;
        // firebase storageに登録する処理
        const uploadTweetImg = storage.ref(`giftImages/${fileName}`).put(image);
        // 記述7
        // firebaseのDBに登録する処理
        console.log("START uploadTweetImg.on")
  
        uploadTweetImg.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {}, //進捗度合いの管理するもの、
          (err) => {
            //エラーに関する処理
            console.log(err);
            alert("Fail Upload Image", err.message);
          },
          async () => {
            // upload 成功
            console.log('SUCCESS UPLOAD IMAGE', fileName);
            try {
              const url = await storage.ref(`giftImages/${fileName}`).getDownloadURL();
              console.log('file path', url);
              const res = await db.collection("namulog").add({
                image: url,
                flower: flower,
                drink: drink,
                bell: bell,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: currentUser.uid,
              });

              console.log('SUCCESS save to group', res);
              alert("なむなむセット完了");
              window.location = "/namunamu";

            } catch(error) {
              console.log(error)
              alert("登録に失敗しました", error.message);
            }
          }
        );

      } else {
          console.log('inputImage 無し', image); // 追加
        // テキストだけ（input="text" だけ）
        db.collection("namulog").add({
            image: "",
            flower: flower,
            drink: drink,
            bell: bell,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: currentUser.uid,
        });
        alert("なむなむセット完了");
        window.location = "/namunamu";
      }
    }

    return (
        <div>
            {/* 選択したアイテムの確認 */}
            <div className="itemCheckWidth">
                <div className="btnWrapGoogle">
                    <button onClick={() => 
                        setIsOpen(true)
                        } className="btnImageGoogle">確認する</button>
                </div>

                <Modal isOpen={modalIsOpen} className="modalContainer" >
                    
                    <span className="itemCheckItem">
                        {flower == "ばら" && <img src={bara} className="itemCheckImg" />}
                        {flower == "きく" && <img src={kiku} className="itemCheckImg" />}
                        {flower == "さくら" && <img src={sakura} className="itemCheckImg" />}
                        {flower == "がーべら" && <img src={garbela} className="itemCheckImg" />}
                        {flower == "こすもす" && <img src={cosmos} className="itemCheckImg" />}
                        {flower == "ひまわり" && <img src={himawari} className="itemCheckImg" />}
                    </span>
                    <span className="itemCheckItem">
                        {drink == "おみず" && <img src={mizu} className="itemCheckImg" />}
                        {drink == "さけ" && <img src={sake} className="itemCheckImg" />}
                        {drink == "こーひー" && <img src={coffee} className="itemCheckImg" />}
                        {drink == "びーる" && <img src={beer} className="itemCheckImg" />}
                        {drink == "おちゃ" && <img src={tea} className="itemCheckImg" />}
                    </span>
                    <span className="itemCheckItem">
                        {bell == "ふつう" && <img src={standard} className="itemCheckImg" />}
                        {bell == "かね" && <img src={kane} className="itemCheckImg" />}
                        {bell == "べる" && <img src={bell02} className="itemCheckImg" />}
                    </span> <br /><br />
                    <span  className="itemCheckImg">
                        {image != "" && "お供えあり"}
                        {image == null && ""}
                    </span>



                    <div className="btnWrapGoogle">
                        <Link to="/namunamu" className="btnImageGoogle" onClick={sendNamuSet}>決定する</Link>
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

export default NumuItemCheck02
