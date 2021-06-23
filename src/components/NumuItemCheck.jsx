import React,{ useState } from 'react'
import Modal from 'react-modal'
import { db, auth} from '../firebase';
import firebase from 'firebase/app';
import Menu from './Menu'
import kiku from "../img/flower/kiku.png"
import sakura from "../img/flower/sakura.png"
import cosmos from "../img/flower/cosmos.png"
import himawari from "../img/flower/himawari.png"
import garbela from "../img/flower/garbela.png"
import bara from "../img/flower/bara.png"
import beer from "../img/drink/beer.png"
import coffee from "../img/drink/coffee.png"
import mizu from "../img/drink/mizu.png"
import sake from "../img/drink/sake.png"
import tea from "../img/drink/tea.png"
import standard from "../img/bell/standard.png"
import kane from "../img/bell/kane.png"
import bell02 from "../img/bell/bell02.png"

Modal.setAppElement("#root");

const NumuItemCheck = ({flower,drink,bell}) => {
    // UID取得＝＝＝＝＝＝
    const [currentUser, setCurrentUser] = useState("")
    auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        });
    // console.log(currentUser.uid)
    // ＝＝＝＝＝＝＝＝＝＝＝

    const [modalIsOpen, setIsOpen] = useState(false);
    const [flowerName, setFlowerName] = useState();
    const [flowerFile, setFlowerFile] = useState();

    console.log("そとで花の名前",flowerName)
    console.log("そとで花のファイル",flowerFile)

    const sendNamuSet = (e) => {
        // console.log(flower)
        db.collection("namulog").add({
            image:"",
            flower: flower,
            drink: drink,
            // smoke: smoke,
            // img: image,
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
                    <button onClick={() => {
                        setIsOpen(true)
                        setFlowerName(flower)
                        }
                        } className="btnImageGoogle">確認する</button>
                </div>

                <Modal isOpen={modalIsOpen}>
                    
                    <span>おはなは{flower}</span><br />
                    <span>のみものは{drink}</span><br />
                    {/* <span>おそなえものは{image}</span><br /> */}
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
