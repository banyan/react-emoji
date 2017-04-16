import { withHandlers, withState, withProps, compose } from 'recompose'
import { spring, presets } from 'react-motion'

import Demo from '../components/Demo'

const defaultItems =  [
  {key: 't1',  data: {text: ':100: :100: :100:'}},
  {key: 't2',  data: {text: ':smile:'}},
  {key: 't3',  data: {text: ':)'}},
  {key: 't4',  data: {text: 'Eat cheese and drink wine'}},
]

export default compose(
  withState('items', 'setItems', defaultItems),
  withState('value', 'setValue', ''),
  withHandlers({
    onInputChange: props => ({target: {value}}) => {
      props.setValue(value)
    },
    onSubmit: props => event => {
      const { value, items } = props
      event.preventDefault()
      if (!value) return
      const newItem = {
        key: 't' + Date.now(),
        data: { text: value },
      }
      props.setItems([ newItem, ...items ])
      props.setValue('')
    },
    getDefaultStyles: props => () => (
      props.items.map(item => ({
        ...item,
        style: {
          height: -500,
          opacity: 10
        }
      }))
    ),
    getStyles: ({ items }) => () => (
      items.map((item) => ({
        ...item,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }))
    ),
  }),
  withProps(props => ({
    willEnter: () => ({
      height: 0,
      opacity: 1,
    })
  })),
)(Demo)
