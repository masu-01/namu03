import React,{ useState, useEffect }  from 'react';
import { auth } from '../firebase';

const Login = (props) => {
    // ログイン状態の保持
    const [isLogin, setIsLogin] = useState(true);

    // メールの状態を保持
    const [email, setEmail] = useState("");

    // パスワードの状態を保持
    const [password, setPassword] = useState("");

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
        <div>
            {/*  */}
            <h1>
                {isLogin ? "Login" : "Register"}
            </h1>

            <hr></hr>

            {/* 記述４　ログインで必要なフォームを準備 */}
            <input
                type="text"
                name="email"
                value={email} //useStateでemailに保持した文字列が入ってくる
                onChange={(e) => setEmail(e.target.value)}
            />

            <hr></hr>

            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);}}
            />

            <hr></hr>

            {/* 記述６　送信ボタン作成 */}
            <button
            onClick={
                // この中にクリックされた処理を記載していく
                isLogin
                    ? async () => {
                        try{
                            // email,passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                            await auth.signInWithEmailAndPassword(email, password);
                            props.history.push("/");
                        } catch(error) {
                            // ログインできない、失敗したときはエラーで表示される
                            alert(error.message);
                        }
                    }
                :
                async () => {
                    try {
                      // 作成時 firebaseに[createUserWithEmailAndPassword]というものがあるのでそれに
                      // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                      await auth.createUserWithEmailAndPassword(email, password);
                      props.history.push("/");
                    } catch (error) {
                      // ログインできない、失敗したときはエラーで表示される
                      alert(error.message);
                    }
                  }
            }
            >
                 {/* 記述８ isLoginの情報を元に　テキストを変更してみましょう🤗*/}
                 {isLogin ? "ログインする" : "登録する"}
            </button>

            <hr />

            {/* 記述9 通常だとisLoginが[true]になっているので[ログインする]という文字列のまま */}
            {/* ここでisLoginを切り替えるonClickを作成します🤗 */}
            <div onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create new account ?" : "Back to login"}
      </div>

        </div>
    )
};

export default Login
