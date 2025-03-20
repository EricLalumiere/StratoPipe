import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AssetList from "./components/AssetList";
import NotificationHandler from "./notifications/NotificationHandler";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div>
        <h1>StratoPipe</h1>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/assets">Assets</Link></li>
          </ul>
        </nav>

        <NotificationHandler />

        {/* Routes */}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/assets" component={AssetList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
