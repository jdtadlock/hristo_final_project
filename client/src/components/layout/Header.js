import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/"><h1>THE SHAPE OF MUSIC</h1></Link>
        <ul className="nav">
          <h2>Sign Up</h2>
          <h2>Login</h2>
          <Link to="/post"><h2>Create Post</h2></Link>
        </ul>
      </div>
    );
  }
}

export default Header;