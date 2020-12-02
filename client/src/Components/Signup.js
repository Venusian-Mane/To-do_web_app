import React, { Component } from 'react';

export default class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: '',
      token: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUser = (event) => this.setState({ username: event.target.value });

  handlePassword = (event) => this.setState({ password: event.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    alert('You are logging in');
    let { username, password } = this.state;
    try {
      let usedState = { username, password };
      let send = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usedState }),
      });
      let res = await send.json();
      this.setState({ token: res.message });
      localStorage.setItem('Token', this.state.token);
    } catch (error) {
      console.log('There has been a problem with your fetch operation:', error);
    }
    if (this.state.token !== '') {
      window.location.replace('/todo');
    }
  };

  render() {
    return (
      <div>
        <h1 className="mainHead">Welcome to Todo</h1>
        <p>
          Here is where you can create your own todo list, edit it and save it
          to the database
        </p>
        <hr />
        <div className="login-form">
          <h2 className="operationHead">Sign Up</h2>
          <br />

          <form className="labelsect">
            <label>
              Enter a Username:
              <br />
              <input
                onChange={this.handleUser}
                type="text"
                placeholder="Sheldon"
              />
            </label>
            <br />
            <label>
              Enter your password:
              <br />
              <input onChange={this.handlePassword} type="password" />
            </label>
            <br />
          </form>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
