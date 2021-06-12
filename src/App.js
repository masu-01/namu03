import React,{ useState, useEffect } from 'react';
import { db, auth } from './firebase'
import './App.css';
import TaskItem from './components/TaskItem';
import Feed from './components/Feed';
import Post from './components/Post';
import Logout from './components/Logout';

function App(props) {

  // ==ログイン認証===================================================
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


  // =================================================================
  // 授業3

    // useStateを使ってfirebaseのデータを保持する
    const [data, setData] = useState([
      {
        id:"",
        name:"",
        bday:"",
      }
    ])

    // ページが表示されるときにuseEffectを使う
    useEffect(() =>{
      const firebaseData = db.collection("group").onSnapshot((snapshot) =>{
        setData(
          snapshot.docs.map((dbData) =>({
            id: dbData.id,
            name: dbData.data().name,
            bday: dbData.data().bday,
          }))
        )
      })
      return () => firebaseData();
    },[])

    // 登録するための処理
    const [inputNameValue, setInputNameValue] = useState("");
    const [inputBdayValue, setInputBdayValue] = useState("");

    // フォームの入力部分のイベント（onChangeに設定したhandleInputChange）のこと
    const nameInputChange = (e) => { setInputNameValue(e.target.value)};
    const bdayInputChange = (e) => { setInputBdayValue(e.target.value)};

    // 登録ボタンの処理
    const addInputData = (e) => {
      alert("登録しました")

      db.collection("group").add({name:inputNameValue , bday:inputBdayValue})

      setInputNameValue("");
      setInputBdayValue("");
    }


  return (
    <div className="App">
      
      <div>
        <Logout />
        <hr />
      </div>


{/* =========================================================== */}
      <div>
        <h1>react授業4</h1>
        <Feed />
        
       

      </div>
      <hr />


{/* =========================================================== */}
      <div>
        <h1>react授業3</h1>
        {/* input */}
        <input type="text" value={inputNameValue} onChange={nameInputChange} />
        <input type="text" value={inputBdayValue} onChange={bdayInputChange} />
        {/* 登録ボタン */}
        <button
          onClick={addInputData}
          disabled={!inputNameValue}
        >登録</button>

        {/* 表示エリア */}
        {data.map((data) =>(
          <TaskItem id={data.id} name={data.name} bday={data.bday}/>

          // ↓の表示の表示をTaskItem.jsxでコンポーネント化↑して削除ボタンをつけました
          // <div key={data.id}>{data.name} : {data.bday}</div>
        ))}

      </div>
      <hr />


    </div>
  );
}

export default App;
