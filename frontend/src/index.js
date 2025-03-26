import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectManagement from './components/ProjectManagement';
import './styles/ProjectManagement.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/projects" component={ProjectManagement} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
