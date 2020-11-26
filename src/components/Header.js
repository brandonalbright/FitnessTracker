import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './header.css'

function Header(props) {
    const {loggedIn, 
           setLoggedIn,  
           showModal, 
           setShowModal,
           getToken,
           setToken,
           clearToken,
           username,
           setUsername}= props;
    const [loginName, setLoginName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    return (
        <div className='nav'>
            <h1>Fitness Tracker</h1>
            {(getToken())
                ?   <>
                    <h3>Hello, {username}!</h3>
                    <button
                    onClick= {(event)=> {
                        event.preventDefault()
                        setLoggedIn(false);
                        clearToken();
                    }}>Log Out</button>
                    </>
                : <button
                onClick={(event)=> {
                    event.preventDefault();
                    setShowModal(true);
                }}>Login/Sign-Up</button> }
            {(showModal === true)
                    ?<>
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
                                setLoggedIn(true)
                                setUsername(result.user.username)
                                setShowModal(false)
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
                                setLoggedIn(true)
                                setUsername(result.user.username)
                                setShowModal(false)
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
                    </>
                    : null
                    }
            <nav className='nav-items'>
                <Link to="/routines" className='nav-link'>
                    <span>Routines</span>
                </Link>
                <Link to="/activities" className='nav-link'>
                    <span>Activities</span>
                </Link>
                <Link to="/myroutines" className='nav-link'>
                    <span>My Routines</span>
                </Link>
            </nav>
        </div>
    )
}

export default Header