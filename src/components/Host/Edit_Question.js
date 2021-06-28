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
            correctAnswer: ''
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
                correctAnswer: question.correctanswer,
                redirect: false
            })
        })
    }
    updateQuestion() {
        let { question, answer1, answer2, answer3, answer4, correctAnswer, id } = this.state;
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer && id) {
            axios.put(`${getApiRequestUrl()}/api/updatequestion`, { question, answer1, answer2, answer3, answer4, correctAnswer, id }, {withCredentials:true}).then(res => {
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
        <Link to='/host/questions' className='btn-link'>
        &larr; Retour
        </Link>
            <div className='new-q'>
                <label>Question</label>
                <input value={this.state.question} onChange={(e) => this.setState({ question: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Réponse 1</label>
                <input value={this.state.answer1} onChange={(e) => this.setState({ answer1: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Réponse 2</label>
                <input value={this.state.answer2} onChange={(e) => this.setState({ answer2: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Réponse 3</label>
                <input value={this.state.answer3} onChange={(e) => this.setState({ answer3: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Réponse 4</label>
                <input value={this.state.answer4} onChange={(e) => this.setState({ answer4: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Bonne réponse</label>
                <input type='number' value={this.state.correctAnswer} onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                <button onClick={() => this.updateQuestion()}>Enregistrer</button>
            </div>

            </div>
        )
    }
}