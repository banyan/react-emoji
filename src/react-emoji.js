import React              from 'react';
import annotations        from 'emoji-annotation-to-unicode';
import emoticons          from 'emoji-emoticon-to-unicode';
import escapeStringRegexp from 'escape-string-regexp';
import assign             from 'object-assign';
import compact            from 'lodash.compact';

let ReactEmoji = () => {
  const ReactEmojiPropTypes = {
    useEmoticon: React.PropTypes.bool,
    emojiType: React.PropTypes.string,
    host: React.PropTypes.string,
    path: React.PropTypes.string,
    ext: React.PropTypes.string,
    singleEmoji: React.PropTypes.bool,
    strict: React.PropTypes.bool,
    children: React.PropTypes.any,
  };

  const ReactEmojiComponent = React.createClass({
    displayName: "ReactEmoji",

    propTypes: ReactEmojiPropTypes,

    render() {
      let emojifiedChildren = this.emojifyChildrenText(this.props.children, this.getOptionsFromProps());

      if (!emojifiedChildren) return null;

      // support for a wrapper, instead of the span we provide
      if (emojifiedChildren.length === 1 && React.isValidElement(emojifiedChildren[0])) {
        return emojifiedChildren[0];
      } else {
        return (
          <span>
            {emojifiedChildren}
          </span>
        );
      }
    },

    getOptionsFromProps() {
      let options = {};
      let attributes = assign({}, this.props);

      for (let key in ReactEmojiPropTypes) {
        options[key] = this.props[key];
        delete attributes[key];
      }

      options.attributes = attributes;
      return options;
    },

    cloneAndEmojifyChild(child, options) {
      return React.cloneElement(child, {}, this.emojifyChildrenText(child.props.children, options));
    },

    // traverse and emojify the child nodes
    emojifyChildrenText(children, options) {
      return React.Children.map(children, (child) => {
        if (isString(child)) {
          return emojify(child, options);
        } else if (React.isValidElement(child)) {
          return this.cloneAndEmojifyChild(child, options);
        } else {
          return child;
        }
      });
    }

  });

  let isString = (obj) => {
    return toString.call(obj) === '[object String]';
  };

  let getEscapedKeys = (hash) => {
    return Object.keys(hash)
      .map(x => escapeStringRegexp(x))
      .join('|');
  };

  let buildOptions = (options) => {
    let hash = {
      useEmoticon: options.useEmoticon === false ? false : true,
      emojiType: options.emojiType || 'twemoji',
      host: options.host || '',
      path: options.path || '',
      ext: options.ext || 'svg',
      singleEmoji: options.singleEmoji || false,
      strict: options.strict || false
    };
    hash.attributes = assign({width: '20px', height: '20px'}, options.attributes);
    return hash;
  };

  // Use negated lookahead for `:/`, refs: https://github.com/banyan/react-emoji/issues/1
  let specialEmoticons = {':/': '1f615'};
  let specialEmoticonsRegex = "\\:\\/(?!\\/)";

  const emojiWithEmoticons = {
    delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):|${getEscapedKeys(emoticons)}|${specialEmoticonsRegex})`, 'g'),
    dict: assign(annotations, emoticons, specialEmoticons)
  };

  const emojiWithoutEmoticons = {
    delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):)`, 'g'),
    dict: annotations
  };

  let buildImageUrl = (hex, options) => {
    if (options.host) {
      return compact([options.host, options.path, `${hex}.${options.ext}`]).join('/');
    } else if (options.emojiType === 'twemoji') {
      return `https://twemoji.maxcdn.com/${options.ext}/${hex}.${options.ext}`;
    } else if (options.emojiType === 'emojione') {
      return `http://cdn.jsdelivr.net/emojione/assets/${options.ext}/${hex.toUpperCase()}.${options.ext}`;
    } else {
      throw new Error('Invalid emojiType is passed');
    }
  };

  let getKey = (key) => {
    if (key.match(/^:.*:$/)) {
      return key.replace(/^:/, '').replace(/:$/, '');
    } else {
      return key;
    }
  };

  let emojifyTextToSingleEmoji = (text, options) => {
    let { dict } = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons;
    let hex = dict[getKey(text)];
    if (!!options.strict && !hex) throw new Error(`Could not find emoji: ${text}.`);
    if (!hex) return text;
    return React.createElement(
      'img',
      assign(options.attributes, {
        src: buildImageUrl(hex, options)
      })
    );
  };

  let emojifyText = (text, options) => {
    let { delimiter, dict } = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons;
    return compact(
      text.split(delimiter).map(function(word, index) {
        let match = word.match(delimiter);
        if (!!options.strict && word !== '' && match === null) throw new Error(`Could not find emoji: ${word}.`);
        if (match) {
          let hex = dict[getKey(match[0])];
          if (hex === null) return word;
          return React.createElement(
            'img',
            assign(options.attributes, {
              key: index,
              src: buildImageUrl(hex, options)
            })
          );
        } else {
          return word;
        }
      })
    );
  };

  let emojify = (text, options = {}) => {
    if (!text) return null;
    options = buildOptions(options);
    if (options.singleEmoji) {
      return emojifyTextToSingleEmoji(text, options);
    } else {
      return emojifyText(text, options);
    }
  };

  return {
    ReactEmojiComponent: ReactEmojiComponent,

    emojify: emojify,
  };
};

let { ReactEmojiComponent, emojify } = ReactEmoji();

export { emojify }

export var ReactEmojiMixin = {
  emojify: emojify
};

export { ReactEmojiComponent as default }
