import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import List from './components/List'
import Regi from './components/Regi'
import NumuItemChoice from './components/NumuItemChoice'
import NumuItemCheck from './components/NumuItemCheck'
import LoginGoogle from './components/LoginGoogle'

ReactDOM.render(
  <BrowserRouter>
    <>
      {/* ログインしていないときはApp.jsを表示する */}
      <Route exact path="/" component={App} />

      {/* ログインしたときはLogin.jsを表示する */}
      <Route exact path="/login" component={Login} />

      {/* Googleでログイン */}
      <Route exact path="/google-login" component={LoginGoogle} />

      {/* 登録した人のリスト表示ページ */}
      <Route exact path="/list" component={List} />

      {/* 登録ページ */}
      <Route exact path="/regi" component={Regi} />

      {/* なむなむする */}
      <Route exact path="/choice" component={NumuItemChoice} />

      {/* なむなむのアイテム確認 */}
      <Route exact path="/check" component={NumuItemCheck} />

    </>
  </BrowserRouter>,

  document.getElementById('root')
);

