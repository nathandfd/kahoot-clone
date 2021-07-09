import React from 'react';
import Check from '../animations/Check.js';
import Incorrect from '../animations/Incorrect.js';
import Leaderboard from "./Leaderboard";
import {Link} from "react-router-dom";

export default function PlayerGameOver(props){
    return (
        <div className='player-game-over'>
            <h1 className='player-game-over-title'>Hop hop hop on ramasse les copies !</h1>
            <br/>
            {
                props.place === 1?
                    <div>
                        <h2>Félicitations ! 1ère place <span>&#127942;</span></h2>
                        <h2>{props.score} points</h2>
                    </div>
                    :
                    <div>
                        <h2>Bravo ! {props.place}ème place</h2>
                        <h2>{props.score} points</h2>
                        <h3>La première place sera pour toi prochainement ! <span>😁</span></h3>
                    </div>
            }
            <br/>
            <Link to='/'>
                <button className='btn-newGame'>
                    Accueil
                </button>
            </Link>
        </div>
)
}