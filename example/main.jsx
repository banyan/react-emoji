import 'babel-core/polyfill';
import React from 'react';
import Reflux from 'reflux';
import ReactEmojiMixin from '../src/react-emoji';
import EmojiListStore from './store.js'
import EmojiActions from './actions.js'

var EmojiItem = React.createClass({
  mixins: [
    ReactEmojiMixin
  ],

  render() {
    return (
      <div>{ this.emojify(this.props.text, {useEmoticon: this.props.useEmoticon, emojiType: this.props.emojiType}) }</div>
    );
  }
});

let EmojiList = React.createClass({
  propTypes: {
    list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  render: function() {
    let sectionStyle = {
      background: '#b2ebf2',
      height: '200px',
      width: '300px',
      overflow: 'scroll',
      marginBottom: '10px',
      borderRadius: '4px',
      padding: '5px'
    };

    return (
      <section style={sectionStyle}>
      {
        this.props.list.map(function(item) {
          return (
            <EmojiItem
              key={item.key}
              text={item.text}
              useEmoticon={item.useEmoticon}
              emojiType={item.emojiType}
            />
          );
        })
      }
      </section>
    );
  }
});

let App = React.createClass({
  mixins: [
    Reflux.connect(EmojiListStore),
    ReactEmojiMixin
  ],

  handleValueChange: (e) => {
    var text = e.target.value;
    if (e.which === 13 && text) { // hit enter, create new item if field isn't empty
      EmojiActions.addItem(text);
      e.target.value = '';
    } else if (e.which === 27) { // hit escape, clear without creating
      e.target.value = '';
    }
  },

  handleSettingChange: (e) => {
    EmojiActions.changeSetting({
      name: e.target.name,
      value: e.target.value
    });
  },

  handleAllItemsClear: () => {
    EmojiActions.clearAllItems();
  },

  render() {
    return (
      <div>
        <h1>react-emoji demo</h1>
        <dl>
          <dt>useEmoticon</dt>
          <dd>
            <label htmlFor="use-emoticon-true">true</label>
            <input id="use-emoticon-true" type="radio" name="useEmoticon" value={true} onChange={this.handleSettingChange} checked={this.state.useEmoticon === true} />
            <label htmlFor="use-emoticon-false">false</label>
            <input id="use-emoticon-false" type="radio" name="useEmoticon" value={false} onChange={this.handleSettingChange} checked={this.state.useEmoticon === false} />
          </dd>
          <dt>emojiType</dt>
          <dd>
            <label htmlFor="twemoji">twemoji</label>
            <input id="twemoji" type="radio" name="emojiType" value="twemoji" onChange={this.handleSettingChange} checked={this.state.emojiType === 'twemoji'} />
            <label htmlFor="emojione">emojione</label>
            <input id="emojione" type="radio" name="emojiType" value="emojione" onChange={this.handleSettingChange} checked={this.state.emojiType === 'emojione'} />
          </dd>
        </dl>

        <EmojiList list={this.state.list} />

        <input type="text" onKeyUp={this.handleValueChange} placeholder=":100: or :)" />

        <p>
          <button onClick={this.handleAllItemsClear}>Clear all messages</button>
        </p>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
