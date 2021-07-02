import React, { Component } from 'react';
import TenSecLeft from '../../Assests/sounds/10sec_left.wav'
import Gong from '../../Assests/sounds/gong.mp3'
import './Timer.css'

export default class Timer extends Component {
    constructor() {
      super();
      this.state = {
          audio:"",
          gong:"",
          textColor:"normal",
          time:{}
      };
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };

      if (JSON.stringify(obj)!== JSON.stringify(this.state.time)){
          this.setState({
              time:obj
          })
      }

      return obj;
    }
  
    componentDidMount() {
        let music = new Audio(TenSecLeft)
        let gong = new Audio(Gong)
        music.load()
        gong.load()
        music.addEventListener('canplaythrough', () => {
            this.setState({
                audio:music
            })
        })
        gong.addEventListener('canplaythrough', () => {
            this.setState({
                gong:gong
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.time.h && !prevState.time.m && prevState.time.s === 11){
            this.setState({
                textColor:"danger"
            })
            if (this.state.audio){
                this.state.audio.play()
            }
        }
    }

    componentWillUnmount() {
        if (this.state.audio){
            this.state.audio.pause()
        }
        if (this.state.gong){
            this.state.gong.play()
        }
    }

    renderTimeLeft(){
        let time = this.secondsToTime(this.props.time)

        return(
            <span>
                {(time.h !== 0 && time.h !== -1) && <span>{time.h} h </span>}
                {(time.m !== 0 && time.m !== -1) && <span>{time.m} min </span>}
                {(time.s !== 0 && time.s !== -1)?<span>{time.s} s </span>:<span>Terminé</span>}
            </span>
        )
    }

    render() {
      return(
        <div className={`timer ${this.state.textColor}`}>
         Temps restant: {this.renderTimeLeft()}
        </div>
      );
    }
  }