import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectedQuiz, editingQuiz, getApiRequestUrl, setConnected} from '../../Ducks/Reducer';
import './Host.css';
import LogoVenom from "../../Assests/venom_logo.png";
import anime from "animejs";
 
class Main extends Component {
    constructor(){
        super();
        this.state= {
            quizzes: [],
            redirect: false,
        }
        this.setRedirect = this.setRedirect.bind(this);
    }
    componentDidMount(){
        this.getQuizzes()
        
    }
    getQuizzes(){
        axios.get(`${getApiRequestUrl()}/api/getQuizzes`,{withCredentials: true}).then(res => {
            this.setState({
                quizzes: res.data
            })
            anime({
                targets:'.kwizz-container',
                scale:[0,1],
                opacity:[.5, 1],
                delay:anime.stagger(100),
                easing:"easeOutExpo"
            })
        })
    }
    setRedirect(e){
        this.props.selectedQuiz(e);

        this.setState({
            redirect: true
        })
    }
    deleteQuiz(id){
        axios.delete(`${getApiRequestUrl()}/api/deletequiz/${id}`,{withCredentials: true}).then(res => {
            if (res.status === 200){
                this.getQuizzes();
            } else{
                alert("Aïe c'est pété, veuillez contacter un développeur")
            }
        })
    }

    render() {
        if (this.state.redirect){
           return <Redirect to='/game'/>
        }
        let {quizzes} = this.state;
        let mappedQuizzes = quizzes.map(quiz => {
            return(
                <div key={quiz.id} className='kwizz-container' >
                        <h1 className='kwizz-info kwizz-title' >{quiz.quiz_name}</h1>
                        <p className='kwizz-info kwizz-desc'>{quiz.info}</p>
                    <div className='btn-container' >
                        <button onClick={() => this.setRedirect(quiz)} className='btn-play' >Jouer</button>
                    <Link to='/host/questions'>
                        <button onClick={()=> this.props.editingQuiz(quiz)} className='btn-play' >Modifier</button>
                    </Link>
                        <button onClick={() =>  this.deleteQuiz(quiz.id)} className='btn-delete' >Supprimer</button>
                    </div> 
                </div> 
            )
        })
        return (
            <div className='mapped-container' >
                <div className='host-logo-container'>
                    <img src={LogoVenom} alt="Logo venom"/>
                </div> 
                <div className='newKwizz' >
                    <Link to='/host/newquiz' className='btn-link'>
                    <button className='btn-new'>Nouveau Kwizz!</button>
                    </Link>
                </div> 
                <div className='mapped-Kwizzes-container' >
                {mappedQuizzes}
                </div> 
            </div> 
        )
    }
}

const mapStateToProps = (state)=>(
        {isConnected:state.connected}
    )

export default connect(mapStateToProps, {selectedQuiz, editingQuiz})(Main);