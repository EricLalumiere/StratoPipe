import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProjectsPage from './components/ProjectsPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
}

export default App;
