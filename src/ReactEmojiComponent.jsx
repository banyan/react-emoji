import React from 'react'
import { emojify } from './index'

const isString = (obj) => typeof(obj) === 'string'

const ReactEmojiComponent = React.createClass({
  displayName: 'ReactEmoji',

  propTypes: ReactEmojiPropTypes,

  getOptionsFromProps() {
    const options = {}
    const attributes = {
      ...this.props
    }

    for (const key in ReactEmojiPropTypes) {
      options[key] = this.props[key]
      delete attributes[key]
    }

    options.attributes = attributes
    return options
  },

  cloneAndEmojifyChild(child, options) {
    return React.cloneElement(child, {}, this.emojifyChildrenText(child.props.children, options))
  },

  // traverse and emojify the child nodes
  emojifyChildrenText(children, options) {
    return React.Children.map(children, (child) => {
      if (isString(child)) {
        return emojify(child, options)
      } else if (React.isValidElement(child)) {
        return this.cloneAndEmojifyChild(child, options)
      }
      return child
    })
  },

  render() {
    const emojifiedChildren = this.emojifyChildrenText(this.props.children, this.getOptionsFromProps())

    if (!emojifiedChildren) return null

    // support for a wrapper, instead of the span we provide
    if (emojifiedChildren.length === 1 && React.isValidElement(emojifiedChildren[0])) {
      return emojifiedChildren[0]
    }
    return (
      <span>
        {emojifiedChildren}
      </span>
    )
  },
})

const ReactEmojiPropTypes = {
  useEmoticon: React.PropTypes.bool,
  emojiType: React.PropTypes.string,
  host: React.PropTypes.string,
  path: React.PropTypes.string,
  ext: React.PropTypes.string,
  singleEmoji: React.PropTypes.bool,
  strict: React.PropTypes.bool,
  children: React.PropTypes.any,
}

export default ReactEmojiComponent
