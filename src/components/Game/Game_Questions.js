import React from 'react';
import './Game.css';
import triangle from '../../Assests/spider-man-logo.png'
import diamond from '../../Assests/captain-america-logo.png'
import square from '../../Assests/iron-man-logo.png'
import circle from '../../Assests/hulk-logo.png'

export default function GameQuestions(props){
    return(
        <div className='questions-container' >
            <h1 className='player-name'>{props.question}</h1>
            <div className='questions-grid' >
                <div className='question q1'>
                <div className='shape-container' >
                    <img src={triangle} alt='' className='shape-question' />
                </div> 
                    <p id='player-join' >{props.answer1}</p>
                 </div> 
                <div className='question q2'>
                    <div className='shape-container'>
                    <img src={diamond} alt='' className='shape-question' />
                    </div> 
                    <p id='player-join'>{props.answer2}</p>
                 </div>
                <div className='question q3'>
                    <div className='shape-container'>
                    <img src={square} alt='' className='shape-question' />
                    </div> 
                    <p id='player-join'>{props.answer3}</p>
                 </div>
                <div className='question q4'>
                    <div className='shape-container'>
                     <img src={circle} alt='' className='shape-question' />
                    </div> 
                     <p id='player-join'>{props.answer4}</p>
                 </div>
            </div> 
        </div> 
    )
}