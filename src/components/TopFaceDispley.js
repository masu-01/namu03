import React from 'react';
// import '../App.css';
import "./style.css";

// propsを受け取る
const Post = ({ id, name, image}) => {

    return (
                <div className="topFaceDate">
                    <img src={image} alt="" className="topFaceImage" /> 
                    <div className="topFaceName">
                        {name}
                    </div>  
                </div>
    )
}

export default Post
