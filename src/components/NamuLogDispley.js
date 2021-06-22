import React from 'react'
import { db, storage } from '../firebase';

const NamuLogDispley = ({ id, flower, drink, smoke, bell, uid, timestamp}) => {

    return (
        <div>
            <div>時間{timestamp}</div>
            <div>{flower} / {drink} / {smoke} / {bell}</div>            
        </div>
    )
}

export default NamuLogDispley
