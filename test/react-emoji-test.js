import React  from 'react';
import ReactDOM  from "react-dom";
import assert from 'power-assert';
import TestUtils from 'react-addons-test-utils';

import ReactEmojiMixin from "../src/react-emoji";

let SampleComponent = React.createClass({
  getDefaultProps() {
    return {
      options: {}
    };
  },

  mixins: [
    ReactEmojiMixin
  ],

  render() {
    return (
      <div>
        <span>{ this.emojify(this.props.text, this.props.options) }</span>
      </div>
    );
  }
});

describe("ReactEmojiMixin", () => {
  let sampleComponent, div;

  let component = <SampleComponent />;
  div = document.createElement('div');
  sampleComponent = ReactDOM.render(component, div);

  let assertDOM = (expected, text, options) => {
    ReactDOM.render(<SampleComponent text={text} options={options} />, div);
    let span = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "span");
    assert.equal(ReactDOM.findDOMNode(span).innerHTML, expected);
  };

  let assertThrow = (text, options) => {
    let fn = () => {
      ReactDOM.render(<SampleComponent text={text} options={options} />, div);
    };
    assert.throws(fn);
  };

  context('parse', () => {
    it("renders annotation", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.$1\">', ':smile:');
    });

    it("renders emoticon", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f61e.svg\" data-reactid=\".0.0.$1\">', ':(');
    });

    // https://github.com/banyan/react-emoji/issues/1
    context(':/', () => {
      it("converts to emoji", () => {
        assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f615.svg\" data-reactid=\".0.0.$1\">', ':/');
      });

      it("does not convert to emoji", () => {
        assertDOM('<span data-reactid=\".0.0.0\">http://example.org</span>', 'http://example.org');
      });
    });

    // https://github.com/banyan/react-emoji/issues/4
    context('when emoji key is only for GitHub', () => {
      it("does not convert to emoji", () => {
        assertDOM('<span data-reactid=\".0.0.0\">:octocat:</span>', ':octocat:');
      });
    });
  });

  context('options', () => {
    context('emoticons', () => {
      context('when useEmoticon option is not given', () => {
        it("renders emoticon", () => {
          assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f61e.svg\" data-reactid=\".0.0.$1\">', ':(');
        });
      });

      context('when useEmoticon option is given as true', () => {
        it("renders emoticon", () => {
          assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f61e.svg\" data-reactid=\".0.0.$1\">', ':(', {useEmoticon: true});
        });
      });

      context('when useEmoticon option is given as false', () => {
        it("renders emoticon", () => {
          assertDOM('<span data-reactid=\".0.0.0\">:(</span>', ':(', {useEmoticon: false});
        });
      });
    });

    it("reflects emojiType when it's passed via options", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"http://cdn.jsdelivr.net/emojione/assets/svg/1F604.svg\" data-reactid=\".0.0.$1\">', ':smile:', {emojiType: 'emojione'});
    });

    it("reflects host when it's passed via options", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"http://example.org/1f604.svg\" data-reactid=\".0.0.$1\">', ':smile:', {host: 'http://example.org'});
    });

    it("reflects path when it's passed via options", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"http://example.org/foo/1f604.svg\" data-reactid=\".0.0.$1\">', ':smile:', {host: 'http://example.org', path: 'foo'});
    });

    it("reflects ext when it's passed via options", () => {
      assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/png/1f604.png\" data-reactid=\".0.0.$1\">', ':smile:', {ext: 'png'});
    });

    context('attributes', () => {
      it("reflects atttibutes with default options when it's not given", () => {
        assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.$1\">', ':smile:');
      });

      it("reflects atttibutes with default options when it's not given", () => {
        assertDOM('<img width=\"30px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.$1\" class=\"foo\">', ':smile:', {attributes: {width: '30px', className: 'foo'}});
      });
    });

    context('singleEmoji', () => {
      it("renders annotation", () => {
        assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.0\">', ':smile:', {singleEmoji: true});
      });

      it("renders emoticon", () => {
        assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f61e.svg\" data-reactid=\".0.0.0\">', ':(', {singleEmoji: true});
      });

      it("shows text as it is if there is no emoji in dict", () => {
        assertDOM(':foobarbaz:', ':foobarbaz:', {singleEmoji: true});
      });
    });

    context('strict', () => {
      context('when singleEmoji is false', () => {
        context('if emoji is found on list', () => {
          it("renders emoji", () => {
            assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.$1\">', ':smile:', {strict: true});
          });
        });

        context('if emoji is not found on list', () => {
          it("raises an error", () => {
            assertThrow(':foobarbaz:', {strict: true});
          });
        });
      });

      context('when singleEmoji is true', () => {
        context('if emoji is found on list', () => {
          it("renders emoji", () => {
            assertDOM('<img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.0\">', ':smile:', {singleEmoji: true, strict: true});
          });
        });

        context('if emoji is not found on list', () => {
          it("raises an error", () => {
            assertThrow(':foobarbaz:', {singleEmoji: true, strict: true});
          });
        });
      });
    });
  });

  context('multiple', () => {
    it("creates 3 elements", () => {
      ReactDOM.render(<SampleComponent text='foo :smile: :(' />, div);
      let span = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "span");
      assert.equal(
        ReactDOM.findDOMNode(span).innerHTML,
        '<span data-reactid=\".0.0.0\">foo </span><img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f604.svg\" data-reactid=\".0.0.$1\"><span data-reactid=\".0.0.2\"> </span><img width=\"20px\" height=\"20px\" src=\"https://twemoji.maxcdn.com/svg/1f61e.svg\" data-reactid=\".0.0.$3\">'
      );
    });
  });
});
