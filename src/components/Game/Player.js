import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import PlayerQuestions from './Player_Questions';
import PlayerQuestionOver from './Player_Question_Over';
import './Game.css';
import load from '../../Assests/load-circle-outline.svg'
import {getApiRequestUrl} from "../../Ducks/Reducer";
import {Link} from "react-router-dom";

class Player extends Component {
    constructor() {
        super()
        this.state = {
            pinCorrect: false,
            gameStarted: false,
            questionOver: false,
            answerSubmitted: false,
            answeredCorrect: false,
            score: 0
        }
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    componentDidMount() {
        this.socket = io(`${getApiRequestUrl()}/`);
        this.socket.emit('player-joined', this.props.selectedPin)
        this.socket.emit('player-add', this.props)
        this.socket.on('room-joined', (data) => { console.log('Quiz data: ' + data) })
        this.socket.on('question-over', () => {
            this.setState({
                questionOver: true
            })
        })
        this.socket.on('next-question', () => {
            console.log('hit')
            this.setState({
                gameStarted: true,
                questionOver: false,
                answerSubmitted: false,
                answeredCorrect: false
            })
        })
        this.socket.on('sent-info', data => {
            this.setState({
                answeredCorrect: data.answeredCorrect,
                score: data.score
            })
        })
    }
    submitAnswer(num){ 
        this.socket.emit('question-answered', {name: this.props.nickname, answer: num, pin: this.props.selectedPin})
        this.setState({
            answerSubmitted: true
        })
    }
    render() {
        console.log(this.props)
        let { gameStarted, questionOver, answerSubmitted } = this.state;
        return (
            <div className='player-container' >
                <div className='status-bar status-bar-top'>
                    <p className='player-info' id='pin' >PIN: {this.props.selectedPin}</p>
                    <Link to={"/"}>
                        <p id={"homelink"} className={"status-bar-item"}>&larr; Accueil</p>
                    </Link>
                </div> 
                {
                    !gameStarted && !questionOver
                    ?
                    <div className={"main-container"}>
                            <p>Vous y êtes !
                             <br />
                                Pouvez-vous voir votre pseudo sur l'écran ?
                            </p>
                             <div className='answer-container'>
                                    <div className=' q-blank q'></div> 
                                    <div className=' q-blank q'></div> 
                                    <div className=' q-blank q'></div> 
                                    <div className=' q-blank q'></div> 
                             </div> 
                        </div>
                        :
                        gameStarted && !questionOver && !answerSubmitted
                        ?
                        <PlayerQuestions submitAnswer ={this.submitAnswer} />
                        :
                        gameStarted && !questionOver && answerSubmitted
                        ?
                        <div className='waiting-for-results' >
                            <p className='answer-indicator' id= 'too-fast'>N'aurais-tu pas répondu trop vite ?</p>
                            <img src={load} alt='' className='load-circle' />
                        </div> 
                        :
                        <PlayerQuestionOver
                         answeredCorrect={this.state.answeredCorrect}
                        />
                    }
                    <div className='status-bar status-bar-bottom'>
                        <p className='player-info status-bar-item'>{this.props.nickname}</p>
                        <div
                            className={
                              gameStarted && !questionOver && answerSubmitted
                              ?
                              'status-bar-hidden status-bar-item'
                              :
                              'status-bar-score status-bar-item'
                            }
                             >{this.state.score}
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedPin: state.selectedPin,
        nickname: state.nickname
    }
}

export default connect(mapStateToProps)(Player);