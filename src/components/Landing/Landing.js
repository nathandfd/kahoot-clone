import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNickname, selectedPin } from '../../Ducks/Reducer';
import './Landing.css';
import LogoVenom from '../../Assests/venom_logo.png'


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
                                <img src={LogoVenom} alt="Logo venom"/>
                            </div> 
                            <div className='player-input-wrapper' >
                                <input type='number' value={this.state.pin} placeholder='Code PIN Kwizz' onChange={this.handleInput} className='input-user'/>
                                <button onClick={this.handleToggle} className='btn-enter' >Entrer</button>
                            </div> 
                        </div>
                        :
                        <div className='landing-wrapper' >
                          <div className='logo-container' >
                              <img src={LogoVenom} alt="Logo venom"/>
                          </div> 
                            <div>
                                <input type='text' maxLength={10} value={this.state.nickname} placeholder='Pseudo (10 caractères max)' onChange={this.handleNicknameInput} className='input-user' />
                                <Link to='/player'>
                                    <button onClick={this.handleGo} className='btn-enter' >OK, c'est parti !</button>
                                </Link>
                            </div> 
                        </div>
                }
                <div className='logo-host' >
                    <Link to={"/login"}>
                            <p className='btn-host'>Organisateur</p>
                    </Link>
                </div>
            </div>
        )
    }
}


export default connect(null, { handleNickname, selectedPin })(Landing)