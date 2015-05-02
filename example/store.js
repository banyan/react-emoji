import Reflux from 'reflux';
import _ from 'lodash';
import EmojiActions from './actions';

let counter = 0,
    localStorageKey = 'react-emoji';

let EmojiListStore = Reflux.createStore({
  listenables: [EmojiActions],

  getInitialState() {
    let loadedList = localStorage.getItem(localStorageKey);
    if (!loadedList) {
      this.list = [{
        key: counter++,
        created: new Date(),
        text: 'hello! :D :100:',
        useEmoticon: true,
        emojiType: 'twemoji'
      }];
    } else {
      this.list = _.map(JSON.parse(loadedList), function(item) {
        item.key = counter++;
        return item;
      });
    }
    return {
      list: this.list,
      useEmoticon: true,
      emojiType: 'twemoji'
    }
  },

  onAddItem: function(text) {
    this.list.push({
      key: counter++,
      created: new Date(),
      text: text,
      useEmoticon: this.useEmoticon,
      emojiType: this.emojiType
    });
    this.updateList(this.list);
  },

  onChangeSetting: function(setting) {
    let value = setting.name === 'useEmoticon' ? setting.value === 'true' : setting.value;
    this[setting.name] = value;
    this.trigger({[setting.name]: value});
  },

  onClearAllItems() {
    this.list = [];
    localStorage.removeItem(localStorageKey);
    this.updateList(this.list);
  },

  updateList: function(list) {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
    this.trigger({list: this.list});
  }
});

export default EmojiListStore;
