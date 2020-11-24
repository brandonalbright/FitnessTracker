import React from  "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'


function App() {
    
    
    
    return (
        <>
            <h1>Hello!</h1>
            <Router>
                <div>

                    <Switch>
                        <Route path="/activities">
                            {/* activities page */}
                            <h1>This is the ACTIVITIES PAGE</h1>
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
