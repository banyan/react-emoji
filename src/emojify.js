import React from 'react'
import annotations from 'emoji-annotation-to-unicode'
import emoticons from 'emoji-emoticon-to-unicode'
import escapeStringRegexp from 'escape-string-regexp'
import compact from 'lodash.compact'

const getEscapedKeys = hash => Object.keys(hash)
  .map(x => escapeStringRegexp(x))
  .join('|')

const buildOptions = (options) => ({
  useEmoticon: options.useEmoticon !== false,
  emojiType: options.emojiType || 'twemoji',
  host: options.host || '',
  path: options.path || '',
  ext: options.ext || 'svg',
  singleEmoji: options.singleEmoji || false,
  strict: options.strict || false,
  attributes: {
    width: '20px',
    height: '20px',
    ...options.attributes
  }
})

// Use negated lookahead for `:/`, refs: https://github.com/banyan/react-emoji/issues/1
const specialEmoticons = { ':/': '1f615' }
const specialEmoticonsRegex = '\\:\\/(?!\\/)'

const emojiWithEmoticons = {
  delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):|${getEscapedKeys(emoticons)}|${specialEmoticonsRegex})`, 'g'),
  dict: {
    ...annotations,
    ...emoticons,
    ...specialEmoticons,
  }
}

const emojiWithoutEmoticons = {
  delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):)`, 'g'),
  dict: annotations,
}

const buildImageUrl = (hex, options) => {
  if (options.host) {
    return compact([options.host, options.path, `${hex}.${options.ext}`]).join('/')
  } else if (options.emojiType === 'twemoji') {
    return `https://twemoji.maxcdn.com/${options.ext}/${hex}.${options.ext}`
  } else if (options.emojiType === 'emojione') {
    return `https://cdn.jsdelivr.net/emojione/assets/${options.ext}/${hex.toUpperCase()}.${options.ext}`
  }
  throw new Error('Invalid emojiType is passed')
}

const getKey = (key) => {
  if (key.match(/^:.*:$/)) {
    return key.replace(/^:/, '').replace(/:$/, '')
  }
  return key
}

const emojifyTextToSingleEmoji = (text, options) => {
  const { dict } = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons
  const hex = dict[getKey(text)]
  if (!!options.strict && !hex) throw new Error(`Could not find emoji: ${text}.`)
  if (!hex) return text
  return React.createElement(
    'img',
    {
      ...options.attributes,
      src: buildImageUrl(hex, options),
    }
  )
}

const emojifyText = (text, options) => {
  const { delimiter, dict } = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons
  return compact(
    text.split(delimiter).map((word, index) => {
      const match = word.match(delimiter)
      if (!!options.strict && word !== '' && match === null) throw new Error(`Could not find emoji: ${word}.`)
      if (match) {
        const hex = dict[getKey(match[0])]
        if (hex === null) return word
        return React.createElement(
          'img',
          {
            ...options.attributes,
            key: index,
            src: buildImageUrl(hex, options),
          },
        )
      }
      return word
    }),
  )
}

const emojify = (text, options = {}) => {
  if (!text) return null
  options = buildOptions(options)
  if (options.singleEmoji) {
    return emojifyTextToSingleEmoji(text, options)
  }
  return emojifyText(text, options)
}

export default emojify
