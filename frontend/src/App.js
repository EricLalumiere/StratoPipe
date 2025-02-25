import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import AssetUpload from './components/AssetUpload';
import AssetList from './components/AssetList';
import CommentSection from './components/CommentSection';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import NotFoundPage from './components/NotFoundPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route exact path="/projects" component={ProjectList} />
                <Route path="/projects/:id" component={ProjectDetail} />
                <Route path="/assets/upload" component={AssetUpload} />
                <Route path="/assets" component={AssetList} />
                <Route path="/comments" component={CommentSection} />
                <Route exact path="/tasks" component={TaskList} />
                <Route path="/tasks/:id" component={TaskDetail} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
}

export default App;
