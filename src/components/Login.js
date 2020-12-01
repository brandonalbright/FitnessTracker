import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

function Login(props){
    const {loggedIn,
        setLoggedIn,
        setToken,
        setUsername,
        setShowModal} = props;
    
        const [loginName, setLoginName] = useState('')
        const [loginPassword, setLoginPassword] = useState('')
        const [loginError, setLoginError] = useState('')

    return <>
    {loggedIn?
    null
    :
    <form>
    {loginError?
        <h3>{loginError}</h3>
        : null}
    <input type="text" 
        placeholder="loginName" 
        value={loginName}
        onChange={(event) => setLoginName(event.target.value)}></input>
    <input type="text"
        placeholder="loginPassword" 
        value={loginPassword}
        onChange={(event) => setLoginPassword(event.target.value)}></input>
    <button
        onClick={(event) => {
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
                if (result.error) {
                    setLoginError(result.error)
                }
                setToken(result.token)
                setLoggedIn(true)
                setUsername(result.user.username)
                setShowModal(false)
                setLoginName('')
                setLoginPassword('')
                setLoginError('')
            })
            .catch(error => console.log(error));
            
        }}>Login</button>
    <button
    onClick={(event) => {
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
            if (result.error) {
                setLoginError(result.error)
            }
            setToken(result.token)
            setLoggedIn(true)
            setUsername(result.user.username)
            setShowModal(false)
            setLoginName('')
            setLoginPassword('')
            setLoginError('')
        })
        .catch(error => console.log(error))}}>Register</button>
    </form>
    }
    </>
}

export default Login