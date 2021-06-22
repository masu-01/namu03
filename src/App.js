import React,{ useEffect } from 'react';
// import React,{ useState, useEffect } from 'react';
import { auth } from './firebase'
// import { db, auth } from './firebase'
import './App.css';
import Menu from './components/Menu';
import NamuLog from './components/NamuLog';
import butsudan from './img/butsudan.png';
// import NumuItemChoice from './components/NumuItemChoice';

function App(props) {

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


  return (
    <div className="App">
      
      <div>
        <Menu />
        <p>ここがtopページだよ</p>
      背景はぶつだんで、登録した人の写真が並んでます<br />
      コンポーネント化したほうが良さそうではある<br />
      このぶつだんの画像の上にどうやって登録した人の写真のっけるんだろう・・・・・・<br />

      <div className="top-bgi" >
      <img src={butsudan} />
      </div>

      <a href="/choice"><button>なむなむする</button></a>
      </div>

      <hr />
      <NamuLog />

    </div>
  );
}

export default App;
