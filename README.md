# react-emoji

[![Circle CI](https://img.shields.io/circleci/project/banyan/react-emoji.svg?style=flat-square)](https://circleci.com/gh/banyan/react-emoji)
[![NPM](https://img.shields.io/npm/v/react-emoji.svg?style=flat-square)](https://www.npmjs.com/package/react-emoji)

>An emoji mixin for React

## Features

* Switchble emoji assets ([twemoji](https://github.com/twitter/twemoji) or [Emoji One](https://github.com/Ranks/emojione))
* Supports emoticons such as `:) :(`

## Install

```shell
npm i react-emoji
# or
bower i react-emoji # `window.ReactEmoji` is available
```

## Usage

```jsx
let App = React.createClass({
  getDefaultProps() {
    return {
      text: "foo bar :100: :)",
    };
  },

  mixins: [
    ReactEmoji
  ],

  render() {
    return <div>{ this.emojify(this.props.text) }</div>;
  }
});
```

## API

### emojify(text, options)

#### Default options

All options are optional.

Properties | Default value | Type
---|---|---
useEmoticon | true | Boolean
emojiType | twemoji | String
width | 20px | String
height | 20px | String
host | "" | String
path | "" | String
ext | svg | String
className | "" | String

## Tips

In tandem with [react-autolink](https://github.com/banyan/react-autolink).

## Development

### Dependency

```
$ npm i
```


### Run

```
$ npm start # => http://0.0.0.0:8080
```

### Test

```
$ npm test
```

## License

MIT
