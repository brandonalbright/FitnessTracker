import React, {useState, useEffect} from  "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Activities from "./components/Activities";
import Routines from './components/Routines';
import MyRoutines from './components/MyRoutines';
import Login from './components/Login';
import {hitAPI} from './api';
import "./components/activities_myRoutines.css"


function App() {
    const [routinesList, setRoutinesList] = useState([]);
    const [activitiesList, setActivitiesList] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [active, setActive] = useState('login');
    
    useEffect(() => {
      hitAPI("GET", "/routines")
          .then((data) => {
              setRoutinesList(data);
          })
          .catch((error) => {
              console.error("There was a problem getting your routines", error);
          })
  }, []);

    useEffect(() => {
        hitAPI("GET", "/activities")
        .then((data) => {
            setActivitiesList(data.sort((a, b) => (a.id < b.id) ? 1 : -1));
        })
        .catch(console.error);
    }, []);

    const getToken = () => {
        if (localStorage.getItem('authfitness-token')) {
            setLoggedIn(true)
            setUsername(localStorage.getItem('username'))
          return localStorage.getItem('authfitness-token')
        } else {
          localStorage.removeItem('authfitness-token')
        }
      }

    const clearToken = () => {
        localStorage.removeItem('authfitness-token');
        localStorage.removeItem('username')
      }
      
    const setToken = (token, username) => {
        localStorage.setItem('authfitness-token', token);
        localStorage.setItem('username', username)
      }

    
    return (
        <>
            <Router>
                <div className="app">
                    <Header 
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        getToken={getToken}
                        clearToken={clearToken}
                        username={username}
                        active={active}
                        setActive={setActive}/>
                    <Switch>
                        <Route path="/activities">
                            {/* activities page */}
                            <Activities
                              getToken={getToken}
                              routinesList={routinesList}
                              setRoutinesList={setRoutinesList}
                              activitiesList={activitiesList} />
                        </Route>
                        <Route path="/routines">
                            {/* routines page */}
                            <Routines
                              routinesList={routinesList}
                              setRoutinesList={setRoutinesList} />
                        </Route>
                        <Route path="/myroutines">
                            {/* myroutines page */}
                            {loggedIn === false?
                            <Redirect to="/" />
                            :
                            <MyRoutines
                              getToken={getToken} 
                              setActive={setActive}
                              routinesList={routinesList}
                              setRoutinesList={setRoutinesList}
                              username={username} 
                              activitiesList={activitiesList}/>
                            }
                            
                        </Route>
                        <Route path="/">
                            {/* homepage */}
                            {loggedIn?
                            <Redirect to="/myroutines" />
                            :
                            <Login 
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                                clearToken={clearToken}
                                setToken={setToken}
                                setUsername={setUsername}
                                setActive={setActive}
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
