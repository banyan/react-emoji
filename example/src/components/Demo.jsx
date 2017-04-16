import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import { emojify } from 'react-emoji'
import { TransitionMotion } from 'react-motion'

const itemBackgroundColor = '#11DDCC'

const Demo = ({
  value,
  onInputChange,
  onSubmit,
  getDefaultStyles,
  getStyles,
  willEnter,
  settings,
}) => (
    <section className="list-container">
      <div className="form-container">
        <form onSubmit={onSubmit} className="form">
          <input
            className="text-input"
            autoFocus={true}
            placeholder="Type :100: or :)"
            value={value}
            onChange={onInputChange}
            type="text"
          />
        </form>
      </div>

      <section className="list">
        <TransitionMotion
          defaultStyles={getDefaultStyles()}
          styles={getStyles()}
          willEnter={willEnter}>
          {styles =>
            <div>
              {styles.map(({ key, style, data: { text, arrowOrder } }) =>
                <div
                  key={key}
                  style={style}
                >
                  <div className="foo">
                    <div className={`balloon balloon-${arrowOrder}`}>
                      {emojify(text, settings)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </TransitionMotion>
      </section>
    </section>
  )

export default Demo