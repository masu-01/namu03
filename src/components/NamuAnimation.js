import React from 'react'
import "./style.css"
// import TopFaceDispleyGet from './TopFaceDispleyGet';
import kemuri from "../img/kemuri.gif"

const NamuAnimation = (props) => {

    setTimeout(() => {
        props.history.push("/")
      }, 9000);    

    return (
        <div className="wrap">
            <img src={kemuri} className="kemuriImage"/>

            <p className="arigato">
            <span className="c6">♡</span>
            <span className="c1">あ</span>
            <span className="c2">り</span>
            <span className="c3">が</span>
            <span className="c4">と</span>
            <span className="c5">う</span>
            <span className="c6">♡</span>
            {/* <TopFaceDispleyGet /> */}
            </p>

        </div>
    )
}

export default NamuAnimation
