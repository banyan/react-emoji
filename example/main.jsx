import 'babel-core/polyfill';
import React  from 'react';
import ReactEmojiMixin from '../src/react-emoji';

let App = React.createClass({
  getDefaultProps() {
    return {
      text: "hi I'm happy :smile: :100: :+1: :) http://yahoo.co.jp :arrow_double_down:"
    };
  },

  mixins: [
    ReactEmojiMixin
  ],

  render() {
    return (
      <div>
        <div>{ this.emojify(this.props.text) }</div>
        <div>{ this.emojify(this.props.text, {emojiType: 'emojione'}) }</div>
        <div>{ this.emojify(this.props.text, {useEmoticon: false}) }</div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
