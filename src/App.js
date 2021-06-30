import React,{ useEffect } from 'react';
import {Link} from "react-router-dom"
import { auth } from './firebase'
import "bootstrap/dist/css/bootstrap.min.css"
import MediaQuery from 'react-responsive'
import './App.css';
import "../src/components/style.css"
import Menu from './components/Menu';
import NamuLog from './components/NamuLog';
import TopFaceDispleyGet from './components/TopFaceDispleyGet';
import butsudan from './img/butsudan.png';

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
    <>
    <MediaQuery query="(max-width:576px)">
      <div className="App">        
          <Menu />
          <div
            className="contents"
            style={{backgroundImage:'url('+butsudan+')',height:'600px',backgroundRepeat:'no-repeat',backgroundSize:'100% auto'}}
          >
            <div className="contentsInner">
              <div className="topFaceContainer">
                <div className="topFaceItem" >
                <TopFaceDispleyGet />
                </div>
              </div>

              <div className="btnWrapNamu">
                  <Link to="/choice" className="btnImageNamu">なむなむする</Link>
              </div>
            </div>

          </div>

          <div className="namuLogArea">
            <div>あなたのなむログ</div>
            <div className="namuLogData">
            <NamuLog />
            </div>
          </div>
          
      </div>
    </MediaQuery>

    <MediaQuery query="(min-width:577px)">
    <div className="App">
      <div>
        <Menu />
        <div className="contents">
          <div className="topBgi" >
            <img src={butsudan} height="400px" />
          </div>

        <div className="contents">
          <TopFaceDispleyGet />
          <div className="btnWrapNamu">
          <Link to="/choice" className="btnImageNamu">なむなむする</Link>
          </div>
        </div>
      </div>
       <hr />

      </div>

      <div className="namuLogArea">
        <div>あなたのなむログ</div>
        <div className="namuLogData">
          <NamuLog />
        </div>        
      </div>

    </div>
    </MediaQuery>
    </>
  );
}

export default App;
