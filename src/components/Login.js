import React, { useState } from 'react'
import './Login.css'

function Login(props){
    const {loggedIn,
        setLoggedIn,
        setToken,
        setUsername,
        setShowModal,
        setActive} = props;
    
    const [loginName, setLoginName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    setActive('login')


    return (
    <div className="login-form">
    {loggedIn? null :
      <form className="login-form">
          <h2 className="title">Login or Register</h2>
          {loginError?
          <h3 className="error">{loginError}</h3>
          : null}
          <div className="login-inputs">
              <input className="loginName"
                  type="text" 
                  placeholder="loginName" 
                  value={loginName}
                  onChange={(event) => setLoginName(event.target.value)}></input>
              <input className="loginPassword"
                  id="passwordInput"
                  type="password"
                  placeholder="loginPassword" 
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}></input>
          </div>
          <div className="buttons">
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
                          setToken(result.token, result.user.username)
                          setLoggedIn(true)
                          setUsername(result.user.username)
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
                      setToken(result.token, result.user.username)
                      setLoggedIn(true)
                      setUsername(result.user.username)
                      setShowModal(false)
                      setLoginName('')
                      setLoginPassword('')
                      setLoginError('')
                  })
                  .catch(error => console.log(error))}}>Register</button>
          </div>    
      </form>
    }
    </div>
  )
}

export default Login