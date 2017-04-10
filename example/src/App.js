import React from 'react'

// import ReactEmoji from '../../src/index'
import Foo from './Foo'
import './App.css'

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to React</h2>
    </div>
    <Foo />
  </div>
)
    // <ReactEmoji>
      // <span>:100:</span>
    // </ReactEmoji>

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
