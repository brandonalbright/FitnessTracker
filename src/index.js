import React, {useState} from  "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {auth, hitAPI} from './api/index';

import Header from './components/Header'
import Activities from "./components/Activities";
import Routines from './components/Routines';
import MyRoutines from './components/MyRoutines';
import Login from './components/Login';

import './index.css';


function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [username, setUsername] = useState('')
    
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
            <Router>
                <div className="app">
                    <Header 
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        getToken={getToken}
                        clearToken={clearToken}
                        setToken={setToken}
                        username={username}
                        setUsername={setUsername}/>
                    <Switch>
                        <Route path="/activities">
                            {/* activities page */}
                            <Activities
                              getToken={getToken} />
                        </Route>
                        <Route path="/routines">
                            {/* routines page */}
                            <Routines />
                        </Route>
                        <Route path="/myroutines">
                            {/* myroutines page */}
                            <MyRoutines
                              getToken={getToken} />
                        </Route>
                        <Route path="/">
                            {/* homepage */}
                            
                            <h1>This is the HOMEPAGE</h1>
                            {loggedIn?
                                null
                            : <Login 
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                                clearToken={clearToken}
                                setToken={setToken}
                                setUsername={setUsername}
                                setShowModal={setShowModal}
                            />}
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
