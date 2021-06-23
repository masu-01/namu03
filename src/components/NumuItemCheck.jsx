import React,{ useState } from 'react'
import Modal from 'react-modal'
import { db, auth} from '../firebase';
import firebase from 'firebase/app';
import Menu from './Menu'

Modal.setAppElement("#root");

const NumuItemCheck = ({flower,drink,bell,image}) => {
    // UID取得＝＝＝＝＝＝
    const [currentUser, setCurrentUser] = useState("")
    auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        });
    // console.log(currentUser.uid)
    // ＝＝＝＝＝＝＝＝＝＝＝

    const [modalIsOpen, setIsOpen] = useState(false);

    const sendNamuSet = (e) => {
        // console.log(flower)
        db.collection("namulog").add({
            image:"",
            flower: flower,
            drink: drink,
            // smoke: smoke,
            img: image,
            bell: bell,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: currentUser.uid,
        })


    }

    return (
        <div>
            {/* <Menu />
            選択したアイテムの確認 */}

            <div>
                <div className="btnWrapGoogle">
                    <button onClick={() => setIsOpen(true)} className="btnImageGoogle">確認する</button>
                </div>

                <Modal isOpen={modalIsOpen}>
                    <span>おはなは{flower}</span><br />
                    <span>のみものは{drink}</span><br />
                    <span>おそなえものは{image}</span><br />
                    <span>おりんは{bell}</span><br />
                    <button onClick={sendNamuSet}>決定する</button>
                    {/* <button onClick={() => window.location.href='/'}>決定する</button> */}

                    <button onClick={() => setIsOpen(false)}>戻る</button>
                    
                </Modal>
            </div>

        </div>
    )
}

export default NumuItemCheck
