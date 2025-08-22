import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectManagement from './components/ProjectManagement';
import './styles/main.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="App /" component={document.getElementById('root')} />
                <Route path="/projects" component={ProjectManagement} />
            </Routes>
        </Router>
    );
};

// create a dict like struct to assign different buttons to different routes
ReactDOM.render(<App />, document.getElementById('root'));
