import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import ToastContainer from './shared/Toast';
import * as ROUTES from './routes';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Route path={'/'} exact component={Home} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <ToastContainer />
    </Router>
  );
}

export default App;
