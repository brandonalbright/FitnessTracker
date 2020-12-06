import React  from 'react'
import {Link} from 'react-router-dom'
import './header.css'

function Header(props) {
    const {loggedIn, 
           setLoggedIn,  
           getToken,
           clearToken,
           username,
           active,
           setActive
           }= props;
    


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
                : null }
            
            <nav className='nav-items'>
                
                {loggedIn? null
                : <Link to="/" className='nav-link'>
                    <span
                        onClick={()=> setActive('login')}
                    >{(active === 'login')? <strong>Login/Register</strong>: 'Login/Register'}</span>
                </Link>}
                <Link to="/routines" className='nav-link'>
                    <span
                        onClick={()=> setActive('routines')}
                    >{(active === 'routines')? <strong>Routines</strong>: 'Routines'}</span>
                </Link>
                <Link to="/activities" className='nav-link'>
                    <span
                        onClick={()=> setActive('activities')}
                    >{(active === 'activities')? <strong>Activities</strong>: 'Activities'}</span>
                </Link>
                {loggedIn?
                    <Link to="/myroutines" className='nav-link'>
                        <span
                            onClick={()=> setActive('myroutines')}
                    >{(active === 'myroutines')? <strong>My Routines</strong>: 'My Routines'}</span>
                    </Link>
                    : null 
                    }
            </nav>
        </div>
    )
}

export default Header