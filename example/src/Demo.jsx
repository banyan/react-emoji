import React from 'react'
import ReactEmoji from 'react-emoji'

import {TransitionMotion, spring, presets} from 'react-motion'

const Demo = React.createClass({
  getInitialState() {
    return {
      todos: [
        {key: 't1', data: {text: ':100:'}},
        {key: 't2', data: {text: ':smile:'}},
        {key: 't3', data: {text: 'Try to finish conference slides'}},
        {key: 't4', data: {text: 'Eat cheese and drink wine'}},
        {key: 't5', data: {text: 'Go around in Uber'}},
        {key: 't6', data: {text: 'Talk with conf attendees'}},
      ],
      value: '',
      selected: 'all',
    };
  },

  // logic from todo, unrelated to animation
  handleChange({target: {value}}) {
    this.setState({value});
  },

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      key: 't' + Date.now(),
      data: { text: this.state.value },
    };

    this.setState({todos: [
      ...this.state.todos,
      newItem
    ]});
  },

  // actual animation-related logic
  getDefaultStyles() {
    return this.state.todos.map(todo => ({...todo, style: {height: -100, opacity: 1}}));
  },

  getStyles() {
    const {todos, value, selected} = this.state;
    return todos.map((todo, i) => {
      return {
        ...todo,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      };
    });
  },

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  },

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  },

  render() {
    const {todos, value, selected} = this.state;

    return (
      <section>
        <section className="main">
          <header className="header">
            <form onSubmit={this.handleSubmit}>
              <input
                autoFocus={true}
                placeholder="Type :100: or :)"
                value={value}
                onChange={this.handleChange}
              />
            </form>
          </header>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>

            {styles =>
              <ul className="todo-list">
                {styles.map(({key, style, data: {isDone, text}}) =>
                  <li key={key} style={style} className={isDone ? 'completed' : ''}>
                    <ReactEmoji>{text}</ReactEmoji>
                  </li>
                )}
              </ul>
            }
          </TransitionMotion>
        </section>
      </section>
    );
  },
});

export default Demo
