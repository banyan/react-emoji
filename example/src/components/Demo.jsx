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
}) => {
  console.log('settings: ', settings)

  return <section className="list-container">
    <section className="list">
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={getStyles()}
        willEnter={willEnter}>
        {styles =>
          <GridList
            cellHeight={70}
            cols={1}
          >
            {styles.map(({key, style, data: {text}}) =>
              <GridTile
                key={key}
                title={emojify(text, settings)}
                style={style}
                titleBackground={itemBackgroundColor}
              />
            )}
          </GridList>
        }
      </TransitionMotion>
    </section>

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
  </section>
}

export default Demo
