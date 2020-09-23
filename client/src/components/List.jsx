import React, { Component } from 'react';
import axios from 'axios';

import ListEntry from './ListEntry';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todos: [],
    };
    this.getTodos = this.getTodos.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    axios
      .get('/api')
      .then((todos) => {
        this.setState({
          todos: todos.data  //changing todos in the state. Its always  '.data' with axios
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  postTodo(todo) {
    axios
    .post('/api', {todo})
    .then(() => {
      this.getTodos();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  deleteTodo(index) {
    .delete(`/api${index}`)
    .then(() => {
      this.getTodos();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleChange(event) {
    this.setState({
      todo: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTodo(this.state.todo);
    event.target.reset();
  }

  render() {
    return (
      <div>
        <h1>List of things to do</h1>
        <form onSubmit={event => this.handleSubmit(event)}>
          <h4>New todo:</h4>
          <input onChange={this.handleChange} />
        </form>
        <h4>Current todos</h4>
        <ul>
          {this.state.todos.map((todo, index) => (
            <ListEntry
              key={index}
              index={index}
              name={todo}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
