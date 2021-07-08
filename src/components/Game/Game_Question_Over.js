import React, {useEffect} from 'react';
import GameOver from './Game_Over'
import '../Host/Host.css';
import './Game.css';
import anime from "animejs";
import Leaderboard from "./Leaderboard";

export default function GameQuestionOver(props){
    useEffect(()=>{
        anime({
            targets:'ul li',
            scale:[0,1],
            opacity:[.5, 1],
            delay:anime.stagger(200),
        })
    },[])
    return(
        <div>
            {!props.lastQuestion ?
            <div className='question-over-wrapper' >
                <div className='center' >
                    <h1 className='player-name'>Fin de la question</h1>
                    <h2>La bonne réponse était : {props.answer}</h2>
                </div> 
                <div className='center' >
                <button className='btn-new' onClick={props.nextQuestion}>Question suivante</button>
                </div>
                <div className="game-over">
                    <Leaderboard leaderboard={props.leaderboard} length={props.leaderboard.length} isOver={false}/>
                </div>
            </div>
            :
            <GameOver leaderboard={props.leaderboard}/>
        }
        </div>
    )
}