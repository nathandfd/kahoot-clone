import React from "react";

export default function Leaderboard({leaderboard, length, isOver}){
    return(
        <ul>
            {leaderboard.map((player, index)=>{
                if (index < length){
                    if (index === 0){
                        return(
                            <li>
                                <h2>1ère Place {isOver && <span>&#127942;</span>}</h2>
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
                                {
                                    isOver &&
                                    <li>
                                        <h3>{player.name}, je sais que tu feras mieux la prochaine fois 😉</h3>
                                    </li>
                                }
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
                }
            })}
        </ul>
    )
}