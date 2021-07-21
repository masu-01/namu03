// 登録フォーム

import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import firebase from 'firebase/app';
import MediaQuery from 'react-responsive'
import gapi from 'gapi'
// import { gapi } from 'gapi-script';
// import ApiCalendar from "react-google-calendar-api";
import Menu from '../components/Menu';
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"


const Regi02 = (props) => {
  // UID取得＝＝＝＝＝＝
  const [currentUser, setCurrentUser] = useState("")
  auth.onAuthStateChanged(user => {
     setCurrentUser(user);
    });
  console.log("ユーザー情報すべて",currentUser)
  // ＝＝＝＝＝＝＝＝＝＝＝

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
      // e.target.value = "";
    }
  };

  // const gapi = window.gapi
  // const CLIENT_ID = "948990783062-o154qd00d1jg6a15gapd62egphpj3oai.apps.googleusercontent.com"
  // const API_KEY = "AIzaSyDHi8gPjJf42vTD-o5qAAk699Os6FB2r9g"
  // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  // const SCOPES = "https://www.googleapis.com/auth/calendar"
  
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
            const url = await storage.ref(`images/${fileName}`).getDownloadURL();
            console.log('file path', url);
            const res = await db.collection("group").add({
              image: url,
              name: name,
              relation: relation,
              bday: bday,
              dday: dday,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              uid: currentUser.uid,
            });
            console.log('SUCCESS save to group', res);

            // ▼ ここにカレンダー登録書いてみる＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
            console.log("カレンダーここから")
            
            const calSummary = "【命日】"+ name + "さん";
            const calDiscription = "続柄：" + relation;
            const dateTimeS = dday+"T08:00:00"
            const dateTimeE = dday+"T09:00:00"
            const dateMonth = new Date(dday);
            const month = dateMonth.getMonth()+1
            const day = dateMonth.getDate()
            const recurrence = "RRULE:FREQ=YEARLY;BYMONTHDAY="+day+";BYMONTH="+month
            console.log("繰り返しの月日",recurrence)

            // gapi.load("client:auth2",() => {
            //   gapi.client.init({
            //     apiKey: API_KEY,
            //     clientId: CLIENT_ID,
            //     discoveryDocs: DISCOVERY_DOCS,
            //     scope: SCOPES
            //   })
            //   .then(() => {
            //     gapi.client.setToken({access_token: this.access_token})
            //   })
            // })

            // gapi.client.load("calendar","v3",()=> console.log("loaded calendar"));

            // gapi.auth2.getAuthInstance().signIn()
            // .then(() => {
            //   console.log("signed In")

              const event = {
                summary: calSummary,
                description: calDiscription,
                start: {
                  'dateTime': dateTimeS,
                  'timeZone': 'Asia/Tokyo'
                },
                end: {
                  'dateTime': dateTimeE,
                  'timeZone': 'Asia/Tokyo'
                },
                // 繰り返し「毎年」
                recurrence: [
                  recurrence
                ],
                // リマインダーを当日の９時とかにする←終日の予定にするとできなかったので
                // 8ｰ9時の予定を追加して、8時にリマインダーセット
                reminders: {
                  'useDefault': false,
                  'overrides': [
                    // {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 0},
                  ]
                }
              }
              gapi.client.calendar.events.insert(event);
            







            // const event = {
            //   summary: calSummary,
            //   description: calDiscription,
            //   start: {
            //     'dateTime': dateTimeS,
            //     'timeZone': 'Asia/Tokyo'
            //   },
            //   end: {
            //     'dateTime': dateTimeE,
            //     'timeZone': 'Asia/Tokyo'
            //   },
            //   // 繰り返し「毎年」
            //   recurrence: [
            //     recurrence
            //   ],
            //   // リマインダーを当日の９時とかにする←終日の予定にするとできなかったので
            //   // 8ｰ9時の予定を追加して、8時にリマインダーセット
            //   reminders: {
            //     'useDefault': false,
            //     'overrides': [
            //       // {'method': 'email', 'minutes': 24 * 60},
            //       {'method': 'popup', 'minutes': 0},
            //     ]
            //   }
            // };
          
            // ▲ ここにカレンダー登録書いてみる＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

            // ▼ ここに移動
            setName("");
            setBday("");
            setDday("");
            setInputImage("");
            alert("登録しました");
            // ▲ ここに移動させる

          } catch(error) {
            console.log(error)
            alert("登録に失敗しました", error.message);
          }
        }
      );

      setName("");
      setRelation("");
      setBday("");
      setDday("");
      setInputImage("");
      // alert("登録しました");
    } else {
      console.log('inputImage 無し', inputImage); // 追加
      // テキストだけ（input="text" だけ）
      db.collection("group").add({
        image: "",
        name: name,
        relation: relation,
        bday: bday,
        dday: dday,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: currentUser.uid,
      });

        // ▼ ここにカレンダー登録書いてみる＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        const calSummary = "【命日】"+ name + "さん";
        const calDiscription = "続柄：" + relation;
        const dateTimeS = dday+"T08:00:00"
        const dateTimeE = dday+"T09:00:00"
        const dateMonth = new Date(dday);
        const month = dateMonth.getMonth()+1
        const day = dateMonth.getDate()
        const recurrence = "RRULE:FREQ=YEARLY;BYMONTHDAY="+day+";BYMONTH="+month
        console.log("繰り返しの月日",recurrence)

        // 2.認証チェック
          const event = {
            summary: calSummary,
            description: calDiscription,
            start: {
              'dateTime': dateTimeS,
              'timeZone': 'Asia/Tokyo'
            },
            end: {
              'dateTime': dateTimeE,
              'timeZone': 'Asia/Tokyo'
            },
            // 繰り返し「毎年」
            recurrence: [
              recurrence
            ],
            // リマインダーを当日の９時とかにする←終日の予定にするとできなかったので
            // 8ｰ9時の予定を追加して、8時にリマインダーセット
            reminders: {
              'useDefault': false,
              'overrides': [
                // {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 0},
              ]
            }
          };
          console.log("event", event)
          // ApiCalendar.createEvent(event);

        // ▲ ここにカレンダー登録書いてみる＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

      setName("");
      setRelation("");
      setBday("");
      setDday("");
      setInputImage("");
      alert("登録しました");
    }
    
  };

  return (
    <>
      <MediaQuery query="(max-width:576px)">
      <div className="body-content">
          <Menu />

        {/* 登録の担当をするパーツ（コンポーネント） */}
        {/* TweetInputではinputタグや送信ボタンを置いて、firebaseにデータを登録するものを記述します */}
        <h1 className="titleText">★ぜんぞとうろく★</h1>
        {/* formタグを使います */}
        <form onSubmit={sendTweet}>
          {/* なまえ */}
          <div class="mb-3 regiForm">
            <label class="form-label">なまえ</label>
            <input
             type="text"
             placeholder="なまえを入力してください"
             class="form-control"
             autoFocus
             value={name}
             onChange={(e) => setName(e.target.value)}
             />
          </div>

          {/* ぞくがら */}
          <div class="mb-3 regiForm">
            <label class="form-label">ぞくがら</label>
            <input
             type="text"
             placeholder="続柄を入力してください"
             class="form-control"
             value={relation}
             onChange={(e) => setRelation(e.target.value)}
              />
          </div>

          {/* 生年月日 */}
          <div class="mb-3 regiForm">
            <label class="form-label">たんじょうび</label>
            <input
              type="date"
              class="form-control"
              value={bday}
              onChange={(e) => setBday(e.target.value)}
               />
          </div>

          {/* 命日 */}
          <div class="mb-3 regiForm">
            <label class="form-label">めいにち</label>
            <input
              type="date"
              class="form-control"
              value={dday}
              onChange={(e) => setDday(e.target.value)}
             />
             <span className="regiText">※命日はGoogleカレンダーに登録されます</span>
          </div>

          <div class="mb-3 regiForm">
            <label class="form-label">写真ありますか？</label>
            <input class="form-control" type="file" onChange={onChangeImageHandler} />
          </div>

          <div>
          <button type="submit" class="btn btn-outline-warning" disabled={!name} disabled={!inputImage}>とうろく</button>
          </div>

            <span className="regiText">ボタン押したら、登録完了と表示されるまで待ってね</span>
        </form>
      </div>
      </MediaQuery>


      <MediaQuery query="(min-width:577px)">
        <div className="body-content">
            <Menu />

          {/* 登録の担当をするパーツ（コンポーネント） */}
          {/* TweetInputではinputタグや送信ボタンを置いて、firebaseにデータを登録するものを記述します */}
          <h1 className="titleText">登録してください</h1>
          {/* formタグを使います */}
          <form onSubmit={sendTweet}>
              <div>
              <label>
              <input type="file" onChange={onChangeImageHandler} className="regiInput" />
              写真を登録してください</label>
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
              <label>お誕生日</label>
              <input
                type="date"
                placeholder="誕生日"
                className="loginInput"
                autoFocus
                value={bday}
                onChange={(e) => setBday(e.target.value)}
              />
            </div>
            <div>
            <label>命日</label>
              <input
                type="date"
                placeholder="命日"
                className="loginInput"
                autoFocus
                value={dday}
                onChange={(e) => setDday(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" disabled={!name} disabled={!inputImage}>
                登録
              </button>
              </div> 
              <p>ボタン押したら、登録完了と表示されるまで待ってね</p>
          </form>
          </div>
      </MediaQuery>
    </>
  );
};

export default Regi02
