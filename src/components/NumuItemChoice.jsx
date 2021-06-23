import React,{ useState } from 'react'
import "./style.css"
import Menu from './Menu'
import NumuItemCheck from './NumuItemCheck'
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


const NumuItemChoice = () => {

    const [ flower, setFlower ] = useState("")
    const [ drink, setDrink ] = useState("")
    const [ smoke, setSmoke ] = useState("")
    const [ bell, setBell ] = useState("")
  
  
    // const checkItem = (e) => {
    //   console.log(flower)
    //   console.log(drink)
    //   console.log(smoke)
    //   console.log(bell)
  
    //   e.preventDefault();
  
    //   alert("こちらでよろしいですか "+flower+"/"+drink+"/"+smoke+"/"+bell)
  
    // }


    return (
        <div>
            <Menu />

            {/* ここでアイテムを選択する */}
            <div>
            <form>
                <div className="itemWrap">
                <div className="itemTitle">お花はどれにする？</div>
                    <input id="kiku" type="radio" name="flower" value="きく" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="kiku"><img src={kiku} alt="kiku" /></label>
                   
                    <input id="sakura" type="radio" name="flower" value="さくら" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="sakura"><img src={sakura} alt="sakura" /></label>
                   
                    <input id="bara" type="radio" name="flower" value="ばら" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="bara"><img src={bara} alt="bara" /></label>

                    <input id="himawari" type="radio" name="flower" value="ひまわり" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="himawari"><img src={himawari} alt="bara" /></label>
                

                    <input id="garbela" type="radio" name="flower" value="がーべら" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="garbela"><img src={garbela} alt="garbela" /></label>

                    <input id="cosmos" type="radio" name="flower" value="こすもす" onChange={(e) => setFlower(e.target.value)}/>
                    <label for="cosmos"><img src={cosmos} alt="cosmos" /></label>
                </div>

                <div className="itemWrap">
                <div className="itemTitle">のみものはどれにする？</div>
                    <input id="mizu" type="radio" name="drink" value="おみず" onChange={(e) => setDrink(e.target.value)}/>
                    <label for="mizu"><img src={mizu} alt="mizu" /></label>

                    <input id="tea" type="radio" name="drink" value="おちゃ" onChange={(e) => setDrink(e.target.value)}/>
                    <label for="tea"><img src={tea} alt="tea" /></label>

                    <input id="beer" type="radio" name="drink" value="びーる" onChange={(e) => setDrink(e.target.value)}/>
                    <label for="beer"><img src={beer} alt="beer" /></label>

                    <input id="sake" type="radio" name="drink" value="さけ" onChange={(e) => setDrink(e.target.value)}/>
                    <label for="sake"><img src={sake} alt="sake" /></label>

                    <input id="coffee" type="radio" name="drink" value="こーひー" onChange={(e) => setDrink(e.target.value)}/>
                    <label for="coffee"><img src={coffee} alt="coffee" /></label>

                </div>

                

                {/* <div className="itemWrap">
                <div className="itemTitle">お線香はどれにする？</div>
                    <label>らべんだー</label>
                    <input type="radio" name="smoke" value="らべんだー" onChange={(e) => setSmoke(e.target.value)}/>
                    <label>にじ</label>
                    <input type="radio" name="smoke" value="にじ" onChange={(e) => setSmoke(e.target.value)}/>
                    <label>かとりせんこう</label>
                    <input type="radio" name="smoke" value="かとりせんこう" onChange={(e) => setSmoke(e.target.value)}/>
                </div> */}

                <div className="itemWrap">
                <div className="itemTitle">お鈴はどれにする？</div>
                    <label>ふつう</label>
                    <input type="radio" name="bell" value="ふつう" onChange={(e) => setBell(e.target.value)}/>
                    <label>とらいあんぐる</label>
                    <input type="radio" name="bell" value="とらいあんぐる" onChange={(e) => setBell(e.target.value)}/>
                    <label>てらのかね</label>
                    <input type="radio" name="bell" value="てらのかね" onChange={(e) => setBell(e.target.value)}/>
                </div>

                <span>おそなえものはありますか？</span><br/>
                <span>（ここ、悪魔の写真アップロードなのでもし余裕があればやる程度）</span>

                </form>

                <div>
                    <NumuItemCheck
                        flower = {flower}
                        drink = {drink}
                        smoke = {smoke}
                        bell = {bell}
                    />
                </div>



            </div>
        </div>
    )
}

export default NumuItemChoice
