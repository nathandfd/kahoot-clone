import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './Host-New-Question.css';
import './Host.css';
import {getApiRequestUrl} from "../../Ducks/Reducer";

export default class New_Question extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: 0,
            questionTime: 20,
            redirect: false
        }
        this.addQuestion = this.addQuestion.bind(this)
    }
    addQuestion() {
        let { question, answer1, answer2, answer3, answer4, correctAnswer, questionTime } = this.state;
        let { id } = this.props.match.params
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer && questionTime) {
            axios.post(`${getApiRequestUrl()}/api/newquestion`, { question, answer1, answer2, answer3, answer4, correctAnswer, questionTime, id }, {withCredentials:true}).then(res => {

                if (res.status === 200) {
                    this.setState({
                        redirect: true
                    })

                } else {
                    alert('Something went wrong :(')
                }

            })

        } else {
            alert('Tous les champs doivent être remplis')
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/host/questions' />;
        }
        return (
// I decided to just use arrow functions here instead of binding all of this at the top - Nate
  <div className='background'>
            <Link to='/host/questions' className='btn-go-back'>
                &larr; Retour
            </Link>
            <br/>
    <div className='new-question-wrapper'>
                <div className='new-q input-container'>
                    <input placeholder={" "} onChange={(e) => this.setState({ question: e.target.value })} />
                    <label>Question</label>
                </div>
            
                  <div className='new-q input-container'>
                      <input placeholder={" "} onChange={(e) => this.setState({ answer1: e.target.value })} height='100'/>
                      <label>Réponse 1 </label>
                </div>
                <div className='new-q input-container'>
                    <input placeholder={" "} onChange={(e) => this.setState({ answer2: e.target.value })} />
                    <label>Réponse 2 </label>
                </div>
                <div className='new-q input-container'>
                    <input placeholder={" "} onChange={(e) => this.setState({ answer3: e.target.value })} />
                    <label>Réponse 3 </label>
               </div>
                <div className='new-q input-container'>
                    <input placeholder={" "} onChange={(e) => this.setState({ answer4: e.target.value })} />
                    <label>Réponse 4 </label>
                </div>
                <div className='new-q input-container'>
                    <input placeholder={" "} type='number' min='1' max='4' onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                    <label>Bonne réponse </label>
                </div>
                <div className='new-q input-container'>
                    <input placeholder={" "} value={this.state.questionTime} type='number' min='10' max='120' onChange={(e) => this.setState({ questionTime: e.target.value })} />
                    <label>Temps pour cette question</label>
                </div>
                    <div className='next'>
                        <button onClick={this.addQuestion}  className='btn-new'>Valider</button>
                    </div>
        </div>
     </div>   
        )
    }
}
