import React, {useState} from "react";
import './Connexion.css'
import axios from "axios";
import {getApiRequestUrl, setConnected} from "../../Ducks/Reducer";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

function Connexion({setConnected,isConnected}){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function submitLogin(){
        axios.post(`${getApiRequestUrl()}/auth`,{login:login,password:password}, {withCredentials:true}).then(res=>{
            if (res.data){
                setConnected(true)
            }
            else{
                setLogin('')
                setPassword('')
                setErrorMessage('Identifiants invalides, veuillez recommencer')
            }
        })
    }

    return(
    <div className={"body"}>
        {isConnected && <Redirect to={"/host"}/>}
            <h1 className={"title"}>Connexion</h1>
            {
                (!login && !password && errorMessage)
                &&
                <h2 className={"error-message"}>{errorMessage}</h2>
            }
            <div className={"form"}>
                <div className={"input-container"}>
                    <input id={"login"} placeholder={" "} className={"input"} type={"text"} value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
                    <label className={"label"} htmlFor="login">Identifiant</label>
                </div>
                <div className={"input-container"}>
                    <input id={"password"} placeholder={" "} className={"input"} type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <label className={"label"} htmlFor="password">Mot de passe</label>
                </div>
                <button className={"login-button"} onClick={submitLogin}>Connexion</button>
                <Link to={"/"}>
                    <button id={"back-button"} className={"login-button"}>&larr; Retour</button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return{
        isConnected:state.connected
    }
}

export default connect(mapStateToProps, {setConnected})(Connexion)
