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

<table>
  <tr>
    <th>useEmoticon</th>
    <td>true</td>
  </tr>
  <tr>
    <th>emojitype</th>
    <td>twemoji</td>
  </tr>
  <tr>
    <th>width</th>
    <td>20px</td>
  </tr>
  <tr>
    <th>height</th>
    <td>20px</td>
  </tr>
  <tr>
    <th>host</th>
    <td></td>
  </tr>
  <tr>
    <th>path</th>
    <td></td>
  </tr>
  <tr>
    <th>ext</th>
    <td>svg</td>
  </tr>
  <tr>
    <th>tagName</th>
    <td>img</td>
  </tr>
</table>

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
$ npm run test
```

## License

MIT
