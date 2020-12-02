import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import SubmitForm from './SubmitForm';
export default class App extends Component {
  state = {
    tasks: ['task 1', 'task 2', 'task 3'],
    forbidden: true,
    isLoaded: false,
  };

  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({ tasks: newArr });
  };

  handleSubmit = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  // SUBMITTING THE LIST TO THE DATABASE

  // The "handleSubmitAll" function takes all the list items of the user and sends it to the server
  // The server then uses that to add to the DB

  handleSubmitAll = async (e) => {
    e.preventDefault();
    alert(`You are submitting task data`);
    let jwtoken = localStorage.getItem('Token');
    let todoList = this.state.tasks;

    let send = await fetch('/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwtoken, todoList }),
    });
    let res = await send.json();
    console.log(res);
  };

  // LOADING ALL THE DATA RELATED TO THE USER
  // The componentDidMount function is fired once the component/page has loaded
  // It sends a GET request to the server to get necessary data like authorization and data from the database to render

  async componentDidMount() {
    let jwtoken = localStorage.getItem('Token');
    let send = await fetch('/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtoken}`,
      },
    });
    let response = await send.json();
    if (response.message[0] === 'Allow') {
      this.setState({ forbidden: false });
    } else {
      console.log(response);
    }
    this.setState({ isLoaded: true });
    if (response.message[1] !== undefined) {
      this.setState({ tasks: response.message[1][0].taskList });
    } else {
      console.log(response.message[1]);
    }
  }

  // RENDERING ACCORDING TO PERMISSION

  // The data will only be rendered if the server has given authorization.

  render() {
    const { forbidden, isLoaded } = this.state;

    if (isLoaded === false) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else if (isLoaded === true && forbidden === true) {
      return (
        <div>
          <h1>Forbidden</h1>
        </div>
      );
    } else if (isLoaded === true && forbidden === false) {
      return (
        <div className="wrapper">
          <div className="card frame">
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
          <button onClick={this.handleSubmitAll}>Submit to Database</button>
        </div>
      );
    }
  }
}
