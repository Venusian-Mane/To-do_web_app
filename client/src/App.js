import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoApp from './Components/TodoApp';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/todo" exact component={TodoApp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
