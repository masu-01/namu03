import React from 'react'
import "firebase/auth"
import firebase from "firebase/app"
// import GoogleLoginButton from 'react-social-login-buttons'

const LoginGoogle = () => {
    
    const googleLogin = () => {
        // Googleログイン処理
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      };
    
        return (
          <div>
            <button onClick={googleLogin} align="center" iconSize={'20'} size={'40'}>
              <span style={{ fontSize: 16 }}>Googleでログイン</span>
            </button>
    
          </div>
        );
    };


export default LoginGoogle
