import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { emojify } from 'react-emoji'
import {TransitionMotion, spring, presets} from 'react-motion'

const formStyle = {
  position: 'fixed',
  right: 0,
  bottom: 0,
  width: '100%',
  height: '250px',
  zIndex: 1,
  opacity: 0.9,
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  foo: {
    width: '30%',
    height: '90vh',
    margin: '0 auto',
    overflowY: 'auto',
  },
}

const Demo = ({
  value,
  onInputChange,
  onSubmit,
  getDefaultStyles,
  getStyles,
  willEnter
}) => (
  <section style={styles.root}>
    <section style={styles.foo}>
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={getStyles()}
        willEnter={willEnter}>
        {styles =>
          <GridList
            cellHeight={70}
            style={styles.gridList}
            cols={1}
          >
            {styles.map(({key, style, data: {text}}) =>
              <GridTile
                key={key}
                title={emojify(text)}
                style={style}
                titleBackground='#11DDCC'
              />
            )}
          </GridList>
        }
      </TransitionMotion>
    </section>

    <div style={formStyle}>
      <div style={{width: '40%', margin: '0 auto'}}>
        <form onSubmit={onSubmit}>
          <input
            className="foo"
            autoFocus={true}
            placeholder="Type :100: or :)"
            value={value}
            onChange={onInputChange}
            type="text"
          />
        </form>
      </div>
    </div>
  </section>
)

export default Demo
