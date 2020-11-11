import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Post from './Pages/Post';
import Forum from './Pages/Forum';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/signup' component={Signup} />
                <Route path='/signin' component={Signin} />
                <Route path='/post' component={Post} />
                <Route path='/forum' component={Forum} />
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>
        </Router>
    );
}

export default Routes;
