import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import CallBack from './CallBack/CallBack';
import Canvas from "./components/Canvas";
import CreatePost from "./components/CreatePost";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div className="main">
        <Header auth={auth}/>
        <Route exact path="/" render={(props) => <Canvas {...props} />} />
        <Route exact path="/post" render={(props) => <CreatePost {...props} />} />
        <Route exact path="/callback" render={(props) => {
          handleAuthentication(props);
          return <CallBack {...props} /> 
        }}/>
        <Footer />
      </div>
    </Router>
  );
}