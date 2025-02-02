import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Main from './components/Host/Main';
import New_Quiz from './components/Host/New_Quiz'
import Game from './components/Game/Game'
import Questions from './components/Host/Questions';
import New_Question from './components/Host/New_Question';
import Player from './components/Game/Player';
import Edit_Question from './components/Host/Edit_Question';
import Connexion from "./components/Host/Connexion";
import './App.css';
import './reset.css';
import {connect} from "react-redux";
import GameOver from "./components/Game/Game_Over";

class App extends Component {
  render() {
    return (
      <div className={"body"}>
        <Switch>
          
          <Route path='/' exact component={Landing} />
          <Route path='/login' component={Connexion} />
            {
                (this.props.selectedPin !== 0 && this.props.selectedPin) &&
                <Route path='/player' component={Player} />
            }
            {
                this.props.isConnected &&
                <div>
                  <Route path='/game' component={Game} />
                  <Route path='/host' exact component={Main} />
                  <Route path='/host/newQuiz' component={New_Quiz} />
                  <Route path='/host/questions' component={Questions} />
                  <Route path='/host/newquestion/:id' component={New_Question} />
                  <Route path='/host/editquestion/:id' component={Edit_Question} />
                </div>
            }
          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state=>(
    {
      isConnected:state.connected,
        selectedPin: state.selectedPin
    }
)

export default connect(mapStateToProps, null)(App);