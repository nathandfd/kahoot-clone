import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNickname, selectedPin } from '../../Ducks/Reducer';
import './Landing.css';
import Kwizz from '../../Assests/Kwizz.svg'
import Kwizzard from '../../Assests/Kwizzard--test-pixel.svg'
import Stars from '../animations/Stars.js';


class Landing extends Component {
    constructor() {
        super();
        this.state = {
            pin: '',
            nickname: '',
            toggle: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleNicknameInput = this.handleNicknameInput.bind(this);
        this.handleGo = this.handleGo.bind(this)
    }
    handleInput(e) {
        this.setState({
            pin: e.target.value
        })

    }
    handleToggle() {
        this.props.selectedPin(this.state.pin)
        this.setState({
            toggle: true
        })
    }
    handleNicknameInput(e) {
        this.setState({
            nickname: e.target.value
        })
    }
    handleGo() {
        this.props.handleNickname(this.state.nickname)
    }
    
    render() {
        return (
            <div className='component-container' >
            <div>
                </div>
                {
                    !this.state.toggle
                        ?
                        <div className='landing-wrapper' >
                            <div className='logo-container' >
                                <h1>MyKwizz !</h1>
                            </div> 
                            <div className='player-input-wrapper' >
                                <input type='number' value={this.state.pin} placeholder='Code PIN Kwizz' onChange={this.handleInput} className='input-user'/>
                                <button onClick={this.handleToggle} className='btn-enter' >Entrer</button>
                            </div> 
                        </div>
                        :
                        <div className='landing-wrapper' >
                          <div className='logo-container' >
                            <img src={Kwizz} alt='Kwizz logo' className='logo'/>
                          </div> 
                            <div>
                                <input type='text' value={this.state.nickname} placeholder='Pseudo' onChange={this.handleNicknameInput} className='input-user' />
                                <Link to='/player'>
                                    <button onClick={this.handleGo} className='btn-enter' >OK, c'est parti !</button>
                                </Link>
                            </div> 
                        </div>
                }
                <div className='logo-host' >
                    <Link to={"/host"}>
                        <div className='btn-host' >
                            <a id='atag'>Organisateur</a>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}


export default connect(null, { handleNickname, selectedPin })(Landing)