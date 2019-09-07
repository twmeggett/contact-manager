import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={SignUp} />
    </Router>
  );
}

export default App;
