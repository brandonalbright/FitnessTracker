import React, {useState} from  "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import {auth, hitAPI} from './api/index'
import Activities from "./components/Activities";

function App() {
    const [loginName, setLoginName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [isNew, setIsNew] = useState(true)
    
    const getToken = () => {
        if (localStorage.getItem('authfitness-token')) {
          return localStorage.getItem('authfitness-token')
        } else {
          localStorage.removeItem('authfitness-token')
        }
      }

    const clearToken = () => {
        localStorage.removeItem('authfitness-token')
      }
      
    const setToken = (token) => {
    localStorage.setItem('authfitness-token', token)
    }

    
    return (
        <>
            <h1>Hello!</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    
                    fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: loginName,
                        password: loginPassword
                    })
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        setToken(result.token)
                    })
                    .catch(console.error);
                    
                }}>
                <h1>register</h1>
                <input type="text" 
                    placeholder="loginName" 
                    value={loginName}
                    onChange={(event) => setLoginName(event.target.value)}></input>
                <input type="text"
                    placeholder="loginPassword" 
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}></input>
                <button>Submit</button>
            </form>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    
                    
                    fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: loginName,
                        password: loginPassword
                    })
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        setToken(result.token)
                    })
                    .catch(console.error);
                    
                }}>
                <h1>login</h1>
                <input type="text" 
                    placeholder="loginName" 
                    value={loginName}
                    onChange={(event) => setLoginName(event.target.value)}></input>
                <input type="text"
                    placeholder="loginPassword" 
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}></input>
                <button>Submit</button>
            </form>
            <Router>
                <div>

                    <Switch>
                        <Route path="/activities">
                            {/* activities page */}
                            <Activities />
                        </Route>
                        <Route path="/routines">
                            {/* routines page */}
                            <h1>This is the ROUTINES PAGE</h1>
                        </Route>
                        <Route path="/myroutines">
                            {/* myroutines page */}
                            <h1>This is the MY ROUTINES PAGE</h1>
                        </Route>
                        <Route path="/">
                            {/* homepage */}
                            <h1>This is the HOMEPAGE</h1>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById(`app`)
);
