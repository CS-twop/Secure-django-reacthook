import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './Pages/App';
import Signup from './Pages/Signup';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/signup' component={Signup} />
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>
        </Router>
    );
}

export default Routes;
