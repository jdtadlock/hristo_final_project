import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="header">
        <Link to="/"><h1>THE SHAPE OF MUSIC</h1></Link>
        <ul className="nav">
          {
            !isAuthenticated() && (
              <h2 onClick={this.login.bind(this)}>Sign Up/Login</h2>
            )
          }
          {
            isAuthenticated() && (
              <div className="loggedIn">
                <Link to="/post"><h2>Create Post</h2></Link>
                <h2 onClick={this.logout.bind(this)}>Logout</h2>
              </div>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Header;