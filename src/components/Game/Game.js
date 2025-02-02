import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import GameQuestions from './Game_Questions';
import GameQuestionOver from './Game_Question_Over';
import {getApiRequestUrl} from "../../Ducks/Reducer";
import BackgroundMusic from '../../Assests/sounds/background-music.mp3'
import Timer from "./Timer";
import {Link} from "react-router-dom";
import anime from "animejs";

class Game extends Component {
    constructor() {
        super();
        this.state = {
            pin: 0,
            timer: 0,
            isLive: false,
            questionOver: false,
            gameOver: false,
            currentQuestion: 0,
            questions: [],
            players: [],
            playerCounter: 0,
            leaderBoard: [],
            music:""
        }
        this.questionOver = this.questionOver.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    componentDidMount() {
        axios.get(`${getApiRequestUrl()}/api/getquestions/${this.props.quiz.id}`, {withCredentials:true}).then(res => {
            this.setState({ questions: res.data })
        })
        this.socket = io(`${getApiRequestUrl()}/`);
        this.generatePin();
        this.socket.on('room-joined', data => {
            this.addPlayer(data.name, data.id)
        })
        this.socket.on('room-left', data => {
            this.removePlayer(data.id)
        })
        this.socket.on('player-answer', data => {
            this.submitAnswer(data.name, data.answer)
        })
        this.playBackgroundSound()
    }

    componentWillUnmount() {
        this.state.music.pause()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.questions.length === this.state.currentQuestion) && this.state.isLive && !this.state.gameOver){
            this.setState({
                gameOver:true
            })
            this.gameOver()
        }

        if (this.state.players.length !== prevState.players.length){
            let tl = anime.timeline({
                targets:'.player-name-item:last-child',
                easing:'easeOutBack',
                duration:300
            })

            tl.add({
                scale:1.3,
                rotate:10
            }).add({
                scale:1,
                rotate:0
            },)
        }
    }

    generatePin() {
        let newPin = Math.floor(Math.random() * 9000+10000)
        this.setState({ pin: newPin })
        this.socket.emit('host-join', { pin: newPin });
    }
    startGame() {
        let { players } = this.state;
        if (players[0] && players[1]
        ) {
            this.nextQuestion()
            this.setState({
                isLive: true
            })
            //this.playBackgroundSound()
        } else {
            alert('Vous avez besoin d\'au moins 2 joueurs pour commencer')
        }
    }
    questionOver() {
        let { pin, players } = this.state
        this.socket.emit('question-over', { pin })
        let updatedPlayers = [...players];
        updatedPlayers.forEach((player)=>{
            player.qAnswered = false;
            player.answeredCorrect = false;
        })
        this.setState({
            questionOver: true,
            currentQuestion: this.state.currentQuestion + 1,
            players: updatedPlayers
        })
    }
    timeKeeper() {
        let players = [...this.state.players]

        this.setState({ questionOver: false })

        timeCheck = timeCheck.bind(this)

        function timeCheck(){
            let checkAnswers = ()=>{
                let pAnswered = 0;
                players.forEach((player)=>{
                    player.qAnswered ? ++pAnswered :null
                })
                players.forEach(player => {
                    if(player.answeredCorrect){
                        player.score += (this.state.timer*10 +1000)
                        this.socket.emit('sent-info', { id: player.id, score: player.score, answeredCorrect: player.answeredCorrect })
                    }
                    
                });
                pAnswered === players.length ? this.state.timer=0 : null
                this.setState({
                    timer:this.state.timer -= 1,
                    players:players
                })
            }
            let endQuestion = ()=>{
                clearInterval(timeKept);
                this.questionOver();
            }
            return this.state.timer > 0
            ? checkAnswers()
            : endQuestion()
        }
        let timeKept = setInterval(()=>{timeCheck()}, 1000);
        return timeKept
    }

    nextQuestion() {
        let { pin, questions, currentQuestion } = this.state;
        this.timeKeeper();
        // this.hotTimer();
        currentQuestion === questions.length
            ?
            this.setState({ gameOver: true })
            : 
            this.socket.emit('next-question', { pin })
            this.setState(
                {
                    questionOver:false,
                    timer: this.state.questions[this.state.currentQuestion].questionTime,
                }
            )
    }

    addPlayer(name, id) {
        let player = {
            id: id, // this is now their socket id so they can pull their score to the player component using this
            name: name,
            score: 0,
            qAnswered: false,
            answeredCorrect: false
        }
        let newPlayers = [...this.state.players]
        newPlayers.push(player)
        this.setState({
            players: newPlayers,
            playerCounter: this.state.playerCounter + 1
        })
    }

    removePlayer(id) {
        let playersList = [...this.state.players]
        let newPlayersList = playersList.filter(element => element.id !== id)
        if ((playersList.length !== newPlayersList.length) && !this.state.gameOver){
            this.setState({
                players: newPlayersList,
                playerCounter: this.state.playerCounter - 1
            })
        }
    }

    submitAnswer(name, answer) {
        let player = this.state.players.filter(player => player.name === name);
        let updatedPlayers = this.state.players.filter(player => player.name !== name);
        
        player[0].qAnswered = true;
        answer === this.state.questions[this.state.currentQuestion].correctAnswer
            ?player[0].answeredCorrect = true
            :player[0].answeredCorrect = false

        updatedPlayers.push(player[0])
        this.setState({
            players: updatedPlayers
        })
        
    }

    getLeaderBoard() {
        let unsorted = [...this.state.players];
        let leaderboard = unsorted.sort((a, b) => b.score - a.score)
        return leaderboard
    }

    playBackgroundSound() {
        let music = new Audio(BackgroundMusic)
        this.setState({
            music: music
        })
        music.load()
        music.loop = true
        music.volume = 0.2
        music.addEventListener('canplaythrough', () => {
            music.play()
        })

    }

    gameOver(){
        let leaderboard = this.getLeaderBoard()
        leaderboard.forEach((player,index)=>{
            this.socket.emit('game-over',{id: player.id, score: player.score, place: index+1})
        })
    }

    render() {
        let { pin, questions, currentQuestion, isLive, questionOver, gameOver } = this.state;
        let mappedPlayers = this.state.players.length?this.state.players.map(player => {
            return (
                <p key={player.id} className='player-name player-name-item' >{player.name}</p>
            )
        }):<p className='player-name'>Aucun joueur connecté</p>

        return (
            <div className='component-container' >
                <Link to='/host' className='btn-go-back'>
                    &larr; Retour
                </Link>
                {
                    (this.state.questions.length !== this.state.currentQuestion) &&
                    <div className='pin'>
                        <p id='player-pin'>Code PIN du Kwizz</p>
                        <h1>{pin}</h1>
                    </div>
                }
                {
                    !isLive && !questionOver && !gameOver ?
                        <div className='btn-players' >
                            <button onClick={() => this.startGame()}className='btn-play' >C'est parti !</button>
                            <p className='player-name' id='player-join'>Joueurs connectés</p>
                            {mappedPlayers}
                        </div>
                        :
                        isLive && !questionOver && !gameOver ?
                            <div>
                                <Timer time={this.state.timer} />
                                <GameQuestions
                                    question={questions[currentQuestion].question}
                                    answer1={questions[currentQuestion].answer1}
                                    answer2={questions[currentQuestion].answer2}
                                    answer3={questions[currentQuestion].answer3}
                                    answer4={questions[currentQuestion].answer4}
                                    questionOver={this.questionOver} />
                            </div>
                            :
                            <GameQuestionOver 
                                nextQuestion={this.nextQuestion} 
                                leaderboard={this.getLeaderBoard()}
                                answer={questions[currentQuestion-1][`answer${questions[currentQuestion-1].correctAnswer}`]}
                                lastQuestion={this.state.questions.length === this.state.currentQuestion}  />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(Game)