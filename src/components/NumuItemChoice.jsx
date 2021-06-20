import React,{ useState } from 'react'
import Menu from './Menu'
import NumuItemCheck from './NumuItemCheck'

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
                <span>おはなをえらんでね</span>
                    <label>きく</label>
                    <input type="radio" name="flower" value="きく" onChange={(e) => setFlower(e.target.value)}/>
                    <label>さくら</label>
                    <input type="radio" name="flower" value="さくら" onChange={(e) => setFlower(e.target.value)}/>
                    <label>ばら</label>
                    <input type="radio" name="flower" value="ばら" onChange={(e) => setFlower(e.target.value)}/>
                <hr />

                <span>のみものをえらんでね</span>
                    <label>みず</label>
                    <input type="radio" name="drink" value="おみず" onChange={(e) => setDrink(e.target.value)}/>
                    <label>おちゃ</label>
                    <input type="radio" name="drink" value="おちゃ" onChange={(e) => setDrink(e.target.value)}/>
                    <label>びーる</label>
                    <input type="radio" name="drink" value="びーる" onChange={(e) => setDrink(e.target.value)}/>
                <hr />

                <span>おせんこうをえらんでね</span>
                    <label>らべんだー</label>
                    <input type="radio" name="smoke" value="らべんだー" onChange={(e) => setSmoke(e.target.value)}/>
                    <label>にじ</label>
                    <input type="radio" name="smoke" value="にじ" onChange={(e) => setSmoke(e.target.value)}/>
                    <label>かとりせんこう</label>
                    <input type="radio" name="smoke" value="かとりせんこう" onChange={(e) => setSmoke(e.target.value)}/>
                <hr />

                <span>おりんをえらんでね</span>
                    <label>ふつう</label>
                    <input type="radio" name="bell" value="ふつう" onChange={(e) => setBell(e.target.value)}/>
                    <label>とらいあんぐる</label>
                    <input type="radio" name="bell" value="とらいあんぐる" onChange={(e) => setBell(e.target.value)}/>
                    <label>てらのかね</label>
                    <input type="radio" name="bell" value="てらのかね" onChange={(e) => setBell(e.target.value)}/>
                <hr />

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
