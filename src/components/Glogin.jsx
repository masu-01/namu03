import React,{ useEffect }  from 'react';
import { auth } from '../firebase';
import firebase from "firebase/app"
import "firebase/auth"
import "./style.css"
import num_logo from '../img/num_logo.png'


const Glogin = (props) => {

    const googleLogin = () => {
        // Googleログイン処理
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);

        // provider.addScope('https://www.googleapis.com/auth/calendar');    
      };

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

            {/* ログインボタン */}
            <div className="btnWrapGoogle">
                <button onClick={googleLogin} className="btnImageGoogle">
                    <span style={{ fontSize: 16 }}>Googleでログイン</span>
                </button>
            </div>
        </div>
    )
};

export default Glogin
