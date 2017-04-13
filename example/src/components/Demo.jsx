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
  handleChange({target: {value}}) {
    this.props.setValue(value)
  },

  handleSubmit(e) {
    e.preventDefault()

    const newItem = {
      key: 't' + Date.now(),
      data: { text: this.props.value },
    }

    // this.setState({todos: [newItem].concat(this.state.todos)});
    this.props.setTodos([newItem].concat(this.props.todos))
  },

  // actual animation-related logic
  getDefaultStyles() {
    return this.props.todos.map(todo => ({...todo, style: {height: -500, opacity: 1}}))
  },

  getStyles() {
    const { todos } = this.props
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
    const { value } = this.props

    console.log('this.state: ', this.state)
    console.log('this.props: ', this.props)

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
