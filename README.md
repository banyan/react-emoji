# react-emoji

[![Circle CI](https://img.shields.io/circleci/project/banyan/react-emoji.svg?style=flat-square)](https://circleci.com/gh/banyan/react-emoji)
[![NPM](https://img.shields.io/npm/v/react-emoji.svg?style=flat-square)](https://www.npmjs.com/package/react-emoji)

>An emoji mixin for React

## Features

* Switchble emoji assets ([twemoji](https://github.com/twitter/twemoji) or [Emoji One](https://github.com/Ranks/emojione))
* Supports emoticons such as `:) :(`

## Compatible React Versions

react@0.13.x and react@0.14.x both can be used <= react-emoji@0.4.x.

However, [test code](https://github.com/banyan/react-emoji/tree/master/test) depends on react@0.14.x, it's internal though.

## Demo

[banyan.github.io/react-emoji](http://banyan.github.io/react-emoji/)

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
    return (
      <div>
        <span>{ this.emojify(this.props.text) }</span>
        <span>{ ReactEmoji.emojify(this.props.text) }</span> // or can be used no mixin way
      </div>
    );
  }
});
```

## API

### emojify(text, options)

#### Default options

All options are optional.

Properties | Description | Default | Type
---|---|---|---
useEmoticon | Use emoticon or not| true | Boolean
emojiType | twemoji or emojione are available | twemoji | String
host | Custom host | "" | String
path | Custom path | "" | String
ext | asset ext. svg or png are available | svg | String
attributes | Attributes such as className or onClick | {width: '20px', height: '20px'} | Object
singleEmoji | Show single emoji (either of annotation or emoticon), use this option if input is limited to render single emoji, this is slightly faster | false | Boolean
strict | Throw an error if annotation is not in dict, it's handy if emoji input is not from end user | false | Boolean

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
