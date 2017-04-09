import 'babel-core/polyfill';
import React  from 'react';
import ReactDOM from 'react-dom';
import ReactEmoji, { ReactEmojiMixin, emojify } from '../src/react-emoji';

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
        <div>
          <ReactEmoji>
            {this.props.text}
          </ReactEmoji>
        </div>
        <div>
          <ReactEmoji>
            {"Hello World"}
          </ReactEmoji>
        </div>
        <div>
          <ReactEmoji />
        </div>
        <div>
          <ReactEmoji emojiType = 'emojione'>
            <div>
              <div>
                {this.props.text}
              </div>
              {this.props.text}
            </div>
          </ReactEmoji>
        </div>
        <div>{ emojify(this.props.text) }</div>
        <div>{ this.emojify(this.props.text, {emojiType: 'emojione'}) }</div>
        <div>{ this.emojify(this.props.text, {useEmoticon: false}) }</div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
