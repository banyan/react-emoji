// import 'grommet/scss/vanilla/index'

import 'grommet-css'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Article from 'grommet/components/Article'
import Box from 'grommet/components/Box'
import Tiles from 'grommet/components/Tiles'
import Form from 'grommet/components/Form'
import ReactEmoji from 'react-emoji'
import './App.css'
import {Motion, spring, TransitionMotion} from 'react-motion'
import { Shake, ShakeSlow } from 'reshake'
import Demo from './Demo'
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="React Emoji"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <header>
        <div style={{ color: 'white', margin: '20px', padding: '20px', width: '112px', height: '80px', background: '#8CD7F3', borderRadius: '0px' }}>
          <h1>
            react <br />emoji
          </h1>
        </div>
        <Demo />
      </header>
    </div>
  </MuiThemeProvider>
)

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
