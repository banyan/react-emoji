import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactEmoji from 'react-emoji'
import './App.css'
import {Motion, spring, TransitionMotion} from 'react-motion'
import Demo from './Demo'
import Drawer from './Drawer'
import GlidList from './GlidList'
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider className="baz">
    <div>
      <AppBar
        title="React Emoji"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <GlidList />
    </div>
  </MuiThemeProvider>
)
        // <div style={{ color: 'white', margin: '20px', padding: '20px', width: '112px', height: '80px', background: '#8CD7F3', borderRadius: '0px' }}>
          // <h1>
            // react <br />emoji
          // </h1>
        // </div>
        // <Demo />

// let App = React.createClass({
  // getDefaultProps() {
    // return {
      // text: "hi I'm happy :smile: :100: :+1: :) http://yahoo.co.jp :arrow_double_down:"
    // };
  // },

  // mixins: [
    // ReactEmojiMixin
  // ],

  // render() {
    // return (
      // <div>
        // <div>
          // <ReactEmoji>
            // {this.props.text}
          // </ReactEmoji>
        // </div>
        // <div>
          // <ReactEmoji>
            // {"Hello World"}
          // </ReactEmoji>
        // </div>
        // <div>
          // <ReactEmoji />
        // </div>
        // <div>
          // <ReactEmoji emojiType = 'emojione'>
            // <div>
              // <div>
                // {this.props.text}
              // </div>
              // {this.props.text}
            // </div>
          // </ReactEmoji>
        // </div>
        // <div>{ emojify(this.props.text) }</div>
        // <div>{ this.emojify(this.props.text, {emojiType: 'emojione'}) }</div>
        // <div>{ this.emojify(this.props.text, {useEmoticon: false}) }</div>
      // </div>
    // );
  // }
// });

// ReactDOM.render(<App />, document.getElementById('app'));

export default App
