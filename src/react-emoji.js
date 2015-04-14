import React              from 'react';
import annotations        from 'emoji-annotation-to-unicode';
import emoticons          from 'emoji-emoticon-to-unicode';
import escapeStringRegexp from 'escape-string-regexp';
import assign             from 'object-assign';
import compact            from 'lodash.compact';

let ReactEmoji = () => {
  let getEscapedKeys = (hash) => {
    return Object.keys(hash)
      .map(x => escapeStringRegexp(x))
      .join('|');
  };

  let buildOptions = (options) => {
    return {
      useEmoticon: options.useEmoticon === undefined ? true : false,
      emojiType: options.emojiType || 'twemoji',
      width: options.width || '20px',
      height: options.height || '20px',
      host: options.host || '',
      path: options.path || '',
      ext: options.ext || 'svg',
      tagName: options.tagName || 'img',
    };
  };

  let buildDelimiterAndDict = (useEmoticon) => {
    if (useEmoticon) {
      return {
        delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):|${getEscapedKeys(emoticons)})`, 'g'),
        dict: assign(annotations, emoticons)
      };
    } else {
      return {
        delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):)`, 'g'),
        dict: annotations
      };
    }
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

  return {
    emojify(text, options = {}) {
      if (!text) return null;

      options = buildOptions(options);
      let { delimiter, dict } = buildDelimiterAndDict(options.useEmoticon);

      return compact(
        text.split(delimiter).map(function(word, index) {
          let match = word.match(delimiter);
          if (match) {
            return React.createElement(
              options.tagName,
              assign(options, {
                key: index,
                src: buildImageUrl(dict[getKey(match[0])], options)
              })
            );
          } else {
            return word;
          }
        })
      );
    }
  };
};

export default ReactEmoji();
