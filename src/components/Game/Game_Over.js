import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Game.css';
import anime from "animejs";

export const Leaderboard = ({leaderboard})=>{
    return(
        <ul>
            {leaderboard.map((player, index)=>{
                if (index === 0){
                    return(
                        <li>
                            <h2>1ère Place 🏆</h2>
                            <h2 className='leaderBoard'>{player.name}</h2>
                            <h2>{player.score}</h2>
                        </li>
                    )
                }
                else if(index === leaderboard.length-1){
                    return (
                        <div>
                            <li>
                                <h2>Dernière Place</h2>
                                <h2 className='leaderBoard'>{player.name}</h2>
                                <h2>{player.score}</h2>
                            </li>
                            <li>
                                <h3>{player.name}, je sais que tu feras mieux la prochaine fois 😉</h3>
                            </li>
                        </div>
                    )
                }
                else{
                    return(
                        <li>
                            <h2>{index+1}ème Place</h2>
                            <h2 className='leaderBoard'>{player.name}</h2>
                            <h2>{player.score}</h2>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default function GameOver(props){

    useEffect(()=>{
        anime({
            targets:'ul li',
            scale:[0,1],
            opacity:[.5, 1],
            delay:anime.stagger(200),
        })
    },[])

    return(
        <div className='game-over'>
            <h1 className='leaderBoard-title'>Kwizz terminé</h1>
            <br/>
            <Leaderboard leaderboard={props.leaderboard}/>
            <br/>
            <Link to='/host'>
                <button className='btn-newGame'>
                    Démarrer une nouvelle partie ?
                </button>
            </Link>
        </div> 
    )
}