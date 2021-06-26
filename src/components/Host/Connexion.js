import React, {useState} from "react";
import './Connexion.css'
import axios from "axios";
import {getApiRequestUrl, setConnected} from "../../Ducks/Reducer";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

function Connexion({setConnected}){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [connected, setIsConnected] = useState(false)

    function submitLogin(){
        axios.post(`${getApiRequestUrl()}/auth`,{login:login,password:password}, {withCredentials:true}).then(res=>{
            if (res.data){
                setConnected(true)
                setIsConnected(true)
            }
        })
    }

    return(
    <div>
        {connected && <Redirect to={"/host"}/>}
            <h1>Connexion</h1>
            <input type={"text"} value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
            <input type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={submitLogin}>Connexion</button>
        </div>
    )
}

export default connect(null, {setConnected})(Connexion)
