import React, { Component } from 'react';
import axios from 'axios'
import {Redirect}from "react-router-dom"
import {connect} from 'react-redux'
import {editingQuiz, getApiRequestUrl} from '../../Ducks/Reducer';

class New_Quiz extends Component {
    constructor(){
        super();
        this.state= {
            quiz_name: '',
            info: '',
            redirect: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleTextarea = this.handleTextarea.bind(this);
        this.createQuiz = this.createQuiz.bind(this)
    }
    handleInput(e){
        this.setState({
            quiz_name: e.target.value
        })
    }
    handleTextarea(e){
        this.setState({
            info: e.target.value
        })
    }
    createQuiz(){
        axios.post(`${getApiRequestUrl()}/api/newquiz`, {name: this.state.quiz_name, info: this.state.info}, {withCredentials:true}).then( res => {
           this.props.editingQuiz(res.data[0])
           this.setState({
               redirect: true
           })
        })
       
    }
    render() {
        if (this.state.redirect){
            return <Redirect to='/host/questions'/>
        }
        return (
            <div className='mapped-container' >
                <div className='new-kwizz-form' >
                    <div className={"input-container"}>
                        <input placeholder={" "} className='title-input' onChange={this.handleInput} type='text'/>
                        <label className='kwizz-desc kwizz-info' >Titre du nouveau Kwizz</label>
                    </div>
                    <div className={"input-container"}>
                        <input placeholder={" "} className='desc-input' onChange={this.handleTextarea}></input>
                        <label className='kwizz-desc kwizz-info'>Description du kwizz</label>
                    </div>
                    <div className='kwizz-info ok-go-div' >
                        <button onClick={this.createQuiz} className='btn-play  ok-go' >Valider</button>
                    </div> 
                </div> 
            </div> 
        )
    }
}


export default connect(null, {editingQuiz})(New_Quiz)