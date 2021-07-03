import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Host-New-Question.css';
import './Host-Question.css'
import './Host.css';
import {getApiRequestUrl} from "../../Ducks/Reducer";

export default class Edit_Question extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: '',
            questionTime:''
        }
    }
    componentDidMount() {
        this.getQuestion()
    }
    getQuestion() {
        axios.get(`${getApiRequestUrl()}/api/getquestion/${this.props.match.params.id}`, {withCredentials:true}).then(res => {
            let question = res.data[0]
            this.setState({
                id: question.id,
                question: question.question,
                answer1: question.answer1,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4,
                correctAnswer: question.correctAnswer,
                questionTime: question.questionTime,
                redirect: false
            })
        })
    }
    updateQuestion() {
        let { question, answer1, answer2, answer3, answer4, correctAnswer, id, questionTime} = this.state;
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer && id) {
            axios.put(`${getApiRequestUrl()}/api/updatequestion`, { question, answer1, answer2, answer3, answer4, correctAnswer, questionTime, id }, {withCredentials:true}).then(res => {
                if (res.status === 200) {
                    this.setState({
                        redirect: true
                    })
                } else {
                    alert('Aïe c\'est pété :(')
                }
            })

        } else {
            alert('Tous les champs doivent être complétés')
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/host/questions' />
        }
        return (                                        
// Used a bunch of arrow functions here instead of binding at top - Nate
        <div className='mapped-container'>
            <Link to='/host/questions' className='btn-go-back'>
                &larr; Retour
            </Link>
            <div className='new-q input-container'>
                <input value={this.state.question} onChange={(e) => this.setState({ question: e.target.value })} />
                <label>Question</label>
            </div>
                <br />
            <div className='new-q input-container'>
                <input value={this.state.answer1} onChange={(e) => this.setState({ answer1: e.target.value })} />
                <label>Réponse 1</label>
            </div>
                <br />
            <div className='new-q input-container'>
                <input value={this.state.answer2} onChange={(e) => this.setState({ answer2: e.target.value })} />
                <label>Réponse 2</label>
            </div>
                <br />
            <div className='new-q input-container'>
                <input value={this.state.answer3} onChange={(e) => this.setState({ answer3: e.target.value })} />
                <label>Réponse 3</label>
            </div>
                <br />
            <div className='new-q input-container'>
                <input value={this.state.answer4} onChange={(e) => this.setState({ answer4: e.target.value })} />
                <label>Réponse 4</label>
            </div>
                <br />
            <div className='new-q input-container'>
                <input type='number' value={this.state.correctAnswer} onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                <label>Bonne réponse</label>
            </div>
            <div className='new-q input-container'>
                <input type='number' value={this.state.questionTime} onChange={(e) => this.setState({ questionTime: e.target.value })} />
                <label>Temps pour la question</label>
            </div>
            <div className={"next"}>
                <button className='btn-new' onClick={() => this.updateQuestion()}>Enregistrer</button>
            </div>

            </div>
        )
    }
}