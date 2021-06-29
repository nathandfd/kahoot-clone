import React from 'react';
import {Link} from 'react-router-dom';
import Zoom from '../../components/animations/zoomin.js';
import './Game.css';


export default function GameOver(props){
    return(
        <div className='game-over'>
            <h1 className='leaderBoard-title'>Kwizz terminé</h1>
            <br/>
            <h2 className='leaderBoard'>1ère Place: {props.leaderboard[0].name}</h2>
            <h2 className='leaderBoard'>2ème Place: {props.leaderboard[1].name}</h2>
            <h2 className='leaderBoard'>Dernier : {props.leaderboard.pop().name}</h2>
            <br/>
            <Link to='/host'>
            <button className='btn-newGame'>
            Démarrer une nouvelle partie ?
            </button>
            </Link>
        </div> 
    )
}