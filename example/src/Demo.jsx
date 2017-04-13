import React from 'react'

import {GridList, GridTile} from 'material-ui/GridList'
import { emojify } from 'react-emoji'

import {TransitionMotion, spring, presets} from 'react-motion'

const formStyle = {
  position: 'fixed',
  right: 0,
  bottom: 0,
  width: '100%',
  height: '250px',
  zIndex: 1,
  opacity: 0.9,
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  foo: {
    width: '30%',
    height: '90vh',
    margin: '0 auto',
    overflowY: 'auto',
  },
}

const Demo = React.createClass({
  getInitialState() {
    return {
      todos: [
        {key: 't1', data: {text: ':100:'}},
        {key: 't2', data: {text: ':smile:'}},
        {key: 't3', data: {text: 'Try to finish conference slides'}},
        {key: 't4', data: {text: 'Eat cheese and drink wine'}},
        {key: 't5', data: {text: 'Go around in Uber'}},
        {key: 't6', data: {text: 'Try to finish conference slides'}},
        {key: 't7', data: {text: 'Eat cheese and drink wine'}},
        {key: 't8', data: {text: 'Go around in Uber'}},
        {key: 't9', data: {text: 'Try to finish conference slides'}},
        {key: 't10', data: {text: 'Eat cheese and drink wine'}},
        {key: 't11', data: {text: 'Go around in Uber'}},
      ],
      value: '',
      selected: 'all',
    }
  },

  // logic from todo, unrelated to animation
  handleChange({target: {value}}) {
    this.setState({value})
  },

  handleSubmit(e) {
    e.preventDefault()
    const newItem = {
      key: 't' + Date.now(),
      data: { text: this.state.value },
    }

    this.setState({todos: [newItem].concat(this.state.todos)});
  },

  // actual animation-related logic
  getDefaultStyles() {
    return this.state.todos.map(todo => ({...todo, style: {height: -100, opacity: 1}}))
  },

  getStyles() {
    const { todos } = this.state
    return todos.map((todo, i) => {
      return {
        ...todo,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    })
  },

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    }
  },

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    }
  },

  render() {
    const { value } = this.state

    return (
      <section style={styles.root}>
        <section style={styles.foo}>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>

            {styles =>
              <GridList
                cellHeight={70}
                style={styles.gridList}
                cols={1}
              >
                {styles.map(({key, style, data: {isDone, text}}) =>
                  <GridTile
                    key={key}
                    title={emojify(text)}
                    style={style}
                    titleBackground='#11DDCC'
                  />
                )}
              </GridList>
            }
          </TransitionMotion>
        </section>

        <div style={formStyle}>
          <div style={{width: '40%', margin: '0 auto'}}>
            <form onSubmit={this.handleSubmit}>
              <input
                className="foo"
                autoFocus={true}
                placeholder="Type :100: or :)"
                value={value}
                onChange={this.handleChange}
                type="text"
              />
            </form>
          </div>
        </div>
      </section>
    )
  },
})

export default Demo
