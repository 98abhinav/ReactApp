import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import LocalStorageService from "../components/utility/LocalStorageService";
const localStorageService = LocalStorageService.getService();

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      localStorageService.clearToken();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
    return window.location.href = '/';
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="travellerN-logo.svg" width="112" height="50" alt="travellers logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          {this.props.auth.isAuthenticated && this.props.auth.user && (
              <div className="navbar-start">
                <a href="/" className="navbar-item">
                  Home
                </a>
                <a href="/employees" className="navbar-item">
                  Employees
                </a>
                <a href="/admin" className="navbar-item">
                  Admin
                </a>
              </div>
          )}
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
