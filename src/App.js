import React,{ useState, useEffect } from 'react';
import { db, auth } from './firebase'
import './App.css';
import Feed from './components/Feed';
import Logout from './components/Logout';

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
        <Logout />
        <hr />
      </div>

      <div>
        <h1>react授業4</h1>
        <Feed />
        <hr />
      </div>

    </div>
  );
}

export default App;
