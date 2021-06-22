import React,{ useEffect }  from 'react';
import { auth } from '../firebase';
import firebase from "firebase/app"
import "firebase/auth"
import "./style.css"
import num_logo from '../img/num_logo.png'


const Glogin = (props) => {
    // ログイン状態の保持
    // const [isLogin, setIsLogin] = useState(true);

    const googleLogin = () => {
        // Googleログイン処理
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      };

    // メールの状態を保持
    // const [email, setEmail] = useState("");

    // パスワードの状態を保持
    // const [password, setPassword] = useState("");

    // useEffectを使って
    useEffect(() =>{
        // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
        // onAuthStateChangedは→ログインしていたとか、ログアウトしたとかで呼び出される
        // userというパラメーターがあり、これには「ログインが成功したときに」この部分に全部格納される
        // userに何らかの情報がはいっていればログインに成功、入ってなければログイン失敗、ログインしていない
        const unSub = auth.onAuthStateChanged((user) => {
            // 判定の条件は何らかの情報が入っていた時→ルートの画面（App）に遷移させる(逆にuserにない場合は常にこの画面に止まり続ける)
            user && props.history.push("/");
        });
        return() => unSub();
    },[props.history])


    return (
        <div className="body-content">
            {/* ロゴ表示 */}
            <div className="topLogo" >
            <img src={num_logo} width="350px" alt="num_logo" />
            </div>

            {/* ログインしてください */}
            {/* <h1 className="titleText">
                {isLogin ? "ログインしてください" : "アカウントを作成する"}
            </h1> */}

            <div className="btnWrapGoogle">
            <button onClick={googleLogin} className="btnImageGoogle">
            {/* <button onClick={googleLogin} align="center" iconSize={'20'} size={'40'}> */}
              <span style={{ fontSize: 16 }}>Googleでログイン</span>
            </button>
            </div>

            {/* 記述４　ログインで必要なフォームを準備 */}
            {/* <input
                type="text"
                name="email"
                className="loginInput"
                placeholder="ID"
                value={email} //useStateでemailに保持した文字列が入ってくる
                onChange={(e) => setEmail(e.target.value)}
            /> */}

            {/* <input
                type="password"
                name="password"
                className="loginInput"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);}}
            /> */}

            {/* 記述６　送信ボタン作成 */}
            {/* <div> */}
                {/* <button onClick={googleLogin}> */}
                    {/* 記述８ isLoginの情報を元に　テキストを変更してみましょう🤗*/}
                    {/* {isLogin ? "ログインする" : "登録する"} */}
                {/* </button> */}
            {/* </div> */}


            {/* 記述9 通常だとisLoginが[true]になっているので[ログインする]という文字列のまま */}
            {/* ここでisLoginを切り替えるonClickを作成します🤗 */}
            {/* <div onClick={() => setIsLogin(!isLogin)}> */}
            {/* {isLogin ? "アカウント作成はこちら" : "アカウントをお持ちの方はこちら"} */}
      {/* </div> */}

      <div>
      </div>

        </div>
    )
};

export default Glogin
