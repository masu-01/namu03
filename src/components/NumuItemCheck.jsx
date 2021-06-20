import React,{ useState } from 'react'
import Modal from 'react-modal'
import Menu from './Menu'

Modal.setAppElement("#root");

const NumuItemCheck = ({flower,drink,smoke,bell}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* <Menu />
            選択したアイテムの確認 */}

            <div>
                <button onClick={() => setIsOpen(true)}>確認する</button>
                <Modal isOpen={modalIsOpen}>
                    <span>おはなは{flower}</span><br />
                    <span>のみものは{drink}</span><br />
                    <span>おせんこうは{smoke}</span><br />
                    <span>おりんは{bell}</span><br />
                    <button>決定する</button>

                    <button onClick={() => setIsOpen(false)}>戻る</button>
                </Modal>
            </div>


            
            <div>
            <a href="/">なむなむ（決定）</a>
            </div>
        </div>
    )
}

export default NumuItemCheck
