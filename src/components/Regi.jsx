// 登録フォーム

import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import firebase from 'firebase/app';
import Menu from './Menu';
import "./style.css"


const Regi = (props) => {
    // ==ログイン認証セット===================================================
    useEffect(() => {
        // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
        // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
        const unSub = auth.onAuthStateChanged((user) => {
        // あるときは user = true ,
        // ないときは !user = false
        // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
        !user && props.history.push("login");
        });
        return () => unSub();
    }, []);
    // ==ログイン認証セット===================================================


  // useStateを記述
  // 記述3 画像を保持するためのuseState
  const [inputImage, setInputImage] = useState(null);
  // 入力された文字を保持します
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [bday, setBday] = useState("");
  const [dday, setDday] = useState("");

  // 記述3 ファイル選択→画像を選ぶ　画像を保持する
  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0], "画像");
      // 画像
      setInputImage(e.target.files[0]);
      // 入力部分をからにする
      e.target.value = "";
    }
  };
  // 記述4. 送信ボタンが押されたら（エンターが押されたら）送信の処理=firebaseにデータを登録する処理を書きます
  const sendTweet = (e) => {
    // useStateで保持した変数を確認
    console.log(name);
    console.log(inputImage);
    // formタグを使うと送信の際にリフレッシュされます（画面がリロードされるということ）
    // formタグを使う時は必須！絶対入ります！
    e.preventDefault();

    if (inputImage) {
      // 画像 + テキストを登録させる
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.name;
      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
      // 記述7
      // firebaseのDBに登録する処理
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // 3つ設定できる
        // 進捗度合い = プログレス
        // エラーに関する = アップロードがうまくいかないなどのエラーを管理する
        // 成功した時 今回でいうと async（非同期＝何かを実行した後に次のことをするためのもの）
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("group").add({
                image: url,
                name: name,
                relation: relation,
                bday: bday,
                dday: dday,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
      setName("");
      setRelation("");
      setBday("");
      setDday("");
      setInputImage("");
      alert("登録しました");
    } else {
      // テキストだけ（input="text" だけ）
      db.collection("group").add({
        image: "",
        name: name,
        relation: relation,
        bday: bday,
        dday: dday,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setName("");
      setRelation("");
      setBday("");
      setDday("");
      setInputImage("");
      alert("登録しました");
    }
  };

  return (
    <div className="body-content">
        <Menu />
      {/* 登録の担当をするパーツ（コンポーネント） */}
      {/* TweetInputではinputタグや送信ボタンを置いて、firebaseにデータを登録するものを記述します */}
      <h1 className="titleText">登録してください</h1>
      {/* formタグを使います */}
      <form onSubmit={sendTweet}>
        <div>
          <input type="file" onChange={onChangeImageHandler} className="loginInput" />
        </div>
        <div>
          <input
            type="text"
            placeholder="なまえ"
            className="loginInput"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="続柄"
            className="loginInput"
            autoFocus
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="誕生日"
            className="loginInput"
            autoFocus
            value={bday}
            onChange={(e) => setBday(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="命日"
            className="loginInput"
            autoFocus
            value={dday}
            onChange={(e) => setDday(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={!name}>
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default Regi
