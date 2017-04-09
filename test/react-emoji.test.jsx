import React, { PropTypes } from 'react'
import { mount } from 'enzyme'

import ReactEmoji, { emojify } from '../src/index'

const SampleComponent = ({ text, options }) => (
  <div>
    <span>{ emojify(text, options) }</span>
  </div>
)

SampleComponent.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.shape({
    useEmoticon: PropTypes.bool,
    emojiType: PropTypes.string,
    host: PropTypes.string,
    path: PropTypes.string,
    ext: PropTypes.string,
    attributes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    singleEmoji: PropTypes.bool,
    strict: PropTypes.bool,
  })
}

SampleComponent.defaultProps = {
  options: {}
}

describe('ReactEmoji', () => {
  it('renders annotation', () => {
    const wrapper = mount(
      <ReactEmoji>:smile:</ReactEmoji>
    )
    expect(wrapper).toMatchSnapshot('renders :smile: annotation with ReactEmoji')
  })
})

describe('emojify', () => {
  context('parse', () => {
    it('renders annotation', () => {
      const wrapper = mount(
        <SampleComponent
          text=":smile:"
        />,
      )
      expect(wrapper).toMatchSnapshot('renders :smile: annotation')
    })

    it('renders emoticon', () => {
      const wrapper = mount(
        <SampleComponent
          text=":("
        />,
      )
      expect(wrapper).toMatchSnapshot('renders :( emoticon')
    })

    context(':/', () => { // https://github.com/banyan/react-emoji/issues/1
      it('converts to emoji', () => {
        const wrapper = mount(
          <SampleComponent
            text=":/"
          />,
        )
        expect(wrapper).toMatchSnapshot('renders :/ emoticon')
      })

      it('does not convert to emoji', () => {
        const wrapper = mount(
          <SampleComponent
            text="http://example.org"
          />,
        )
        expect(wrapper).toMatchSnapshot('does not render :/ emoticon')
      })
    })

    context('when emoji key is only for GitHub', () => {
      it('does not convert to emoji', () => {
        const wrapper = mount(
          <SampleComponent
            text=":octocat:"
          />,
        )
        expect(wrapper).toMatchSnapshot('does not render :octocat: annotation')
      })
    })
  })

  context('options', () => {
    context('useEmoticon', () => {
      it('renders emoticon', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ useEmoticon: true }}
          />,
        )
        expect(wrapper).toMatchSnapshot('renders :) emoticon')
      })

      it('does not render emoticon', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ useEmoticon: false }}
          />,
        )
        expect(wrapper).toMatchSnapshot('does not render :) emoticon')
      })
    })

    context('emojiType', () => {
      it("uses emojione's emoji", () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ emojiType: 'emojione' }}
          />,
        )
        expect(wrapper).toMatchSnapshot("uses emojione's emoji")
      })
    })

    context('host', () => {
      it('uses given host', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ host: 'http://example.org' }}
          />,
        )
        expect(wrapper).toMatchSnapshot('uses given host')
      })
    })

    context('path', () => {
      it('uses given path', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ host: 'http://example.org', path: 'foo/bar' }}
          />,
        )
        expect(wrapper).toMatchSnapshot('uses given host and path')
      })
    })

    context('ext', () => {
      it('uses given ext', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ ext: 'png' }}
          />,
        )
        expect(wrapper).toMatchSnapshot('uses given ext')
      })
    })

    context('attributes', () => {
      it('uses given attributes', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ attributes: { width: '30px', className: 'foo' } }}
          />,
        )
        expect(wrapper).toMatchSnapshot('uses given attributes')
      })
    })

    context('singleEmoji', () => {
      it('renders annotation', () => {
        const wrapper = mount(
          <SampleComponent
            text=":smile:"
            options={{ singleEmoji: true }}
          />,
        )
        expect(wrapper).toMatchSnapshot('renders :smile: annotation')
      })

      it('renders emoticon', () => {
        const wrapper = mount(
          <SampleComponent
            text=":)"
            options={{ singleEmoji: true }}
          />,
        )
        expect(wrapper).toMatchSnapshot('renders :) emoticon')
      })

      it('shows text as given if emoji is not found', () => {
        const wrapper = mount(
          <SampleComponent
            text=":foobarbaz:"
            options={{ singleEmoji: true }}
          />,
        )
        expect(wrapper).toMatchSnapshot('renders :foobarbaz: as text')
      })
    })

    context('strict', () => {
      context('strict is true', () => {
        context('if emoji is found on list', () => {
          it('renders emoji', () => {
            const wrapper = mount(
              <SampleComponent
                text=":smile:"
                options={{ strict: true }}
              />,
            )
            expect(wrapper).toMatchSnapshot('renders :smile: annotation')
          })
        })

        context('if emoji is not found on list', () => {
          context('singleEmoji is not given', () => {
            it('throws an error', () => {
              const wrapper = () => (
                mount(
                  <SampleComponent
                    text=":foobarbaz:"
                    options={{ strict: true }}
                  />,
                )
              )
              expect(wrapper).toThrow(new Error('Could not find emoji: :foobarbaz:.'))
            })
          })

          context('singleEmoji is given', () => {
            it('throws an error', () => {
              const wrapper = () => (
                mount(
                  <SampleComponent
                    text=":foobarbaz:"
                    options={{ strict: true, singleEmoji: true }}
                  />,
                )
              )
              expect(wrapper).toThrow(new Error('Could not find emoji: :foobarbaz:.'))
            })
          })
        })
      })
    })
  })

  context('multiple text', () => {
    it('renders emoticon', () => {
      const wrapper = mount(
        <SampleComponent
          text="foo :smile: :("
        />,
      )
      expect(wrapper).toMatchSnapshot('renders multiple emoticon and annotation')
    })
  })
})
