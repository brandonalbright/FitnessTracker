import React, {useState} from  "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import './index.css'
import Activities from "./components/Activities";
import {auth, hitAPI} from './api/index'
import Routines from './components/Routines'


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
                              getToken={getToken}
                              loggedIn={loggedIn} />
                        </Route>
                        <Route path="/routines">
                            {/* routines page */}
                            
                            <h1>This is the ROUTINES PAGE</h1>
                            <Routines />
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
