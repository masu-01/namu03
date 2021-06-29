import React,{useState} from 'react'
import MediaQuery from 'react-responsive'
import "./style.css";
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


const NamuLogDispley = ({ flower, drink, bell, timestamp}) => {

    return (
        <>
        <MediaQuery query="(max-width:576px)">
            <div className="logBody">
                <span className="">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                <span className="">
                    {flower == "ばら" && <img src={bara} className="namulogImg" />}
                    {flower == "きく" && <img src={kiku} className="namulogImg" />}
                    {flower == "さくら" && <img src={sakura} className="namulogImg" />}
                    {flower == "がーべら" && <img src={garbela} className="namulogImg" />}
                    {flower == "こすもす" && <img src={cosmos} className="namulogImg" />}
                    {flower == "ひまわり" && <img src={himawari} className="namulogImg" />}
                </span>
                <span className="">
                    {drink == "おみず" && <img src={mizu} className="namulogImg" />}
                    {drink == "さけ" && <img src={sake} className="namulogImg" />}
                    {drink == "こーひー" && <img src={coffee} className="namulogImg" />}
                    {drink == "びーる" && <img src={beer} className="namulogImg" />}
                    {drink == "おちゃ" && <img src={tea} className="namulogImg" />}
                </span>
                <span className="">
                    {bell == "ふつう" && <img src={standard} className="namulogImg" />}
                    {bell == "かね" && <img src={kane} className="namulogImg" />}
                    {bell == "べる" && <img src={bell02} className="namulogImg" />}
                </span>
                <hr />
            </div>


        </MediaQuery>

        <MediaQuery query="(min-width:577px)">
            <div className="logBody">
                <ul className="logUl">
                    <div className="list-row">
                        <li className="listLi">
                            <span className="span-head01">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            <span className="span-head02">
                                {flower == "ばら" && <img src={bara} className="namulogImg" />}
                                {flower == "きく" && <img src={kiku} className="namulogImg" />}
                                {flower == "さくら" && <img src={sakura} className="namulogImg" />}
                                {flower == "がーべら" && <img src={garbela} className="namulogImg" />}
                                {flower == "こすもす" && <img src={cosmos} className="namulogImg" />}
                                {flower == "ひまわり" && <img src={himawari} className="namulogImg" />}
                            </span>
                            <span className="span-head03">
                                {drink == "おみず" && <img src={mizu} className="namulogImg" />}
                                {drink == "さけ" && <img src={sake} className="namulogImg" />}
                                {drink == "こーひー" && <img src={coffee} className="namulogImg" />}
                                {drink == "びーる" && <img src={beer} className="namulogImg" />}
                                {drink == "おちゃ" && <img src={tea} className="namulogImg" />}
                            </span>
                            <span className="span-head04">
                                {bell == "ふつう" && <img src={standard} className="namulogImg" />}
                                {bell == "かね" && <img src={kane} className="namulogImg" />}
                                {bell == "べる" && <img src={bell02} className="namulogImg" />}
                            </span>
                        </li>
                    </div>
                </ul>
                <hr className="namilogHr" />
            </div>
        </MediaQuery>
        </>

    )
}

export default NamuLogDispley
