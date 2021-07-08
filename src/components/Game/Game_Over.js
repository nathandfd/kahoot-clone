import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Game.css';
import anime from "animejs";
import Leaderboard from "./Leaderboard";

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
            <Leaderboard leaderboard={props.leaderboard} length={props.leaderboard.length} isOver={true}/>
            <br/>
            <Link to='/host'>
                <button className='btn-newGame'>
                    Démarrer une nouvelle partie ?
                </button>
            </Link>
        </div> 
    )
}