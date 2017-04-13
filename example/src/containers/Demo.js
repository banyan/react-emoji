import { withHandlers, withState, withProps, compose, lifecycle } from 'recompose'
import {TransitionMotion, spring, presets} from 'react-motion'

import Demo from '../components/Demo'

const defaultItems =  [
  {key: 't1',  data: {text: ':100:'}},
  {key: 't2',  data: {text: ':smile:'}},
  {key: 't3',  data: {text: 'Try to finish conference slides'}},
  {key: 't4',  data: {text: 'Eat cheese and drink wine'}},
  {key: 't5',  data: {text: 'Go around in Uber'}},
  {key: 't6',  data: {text: 'Try to finish conference slides'}},
  {key: 't7',  data: {text: 'Eat cheese and drink wine'}},
  {key: 't8',  data: {text: 'Go around in Uber'}},
  {key: 't9',  data: {text: 'Try to finish conference slides'}},
  {key: 't10', data: {text: 'Eat cheese and drink wine'}},
  {key: 't11', data: {text: 'Go around in Uber'}},
]

export default compose(
  withState('items', 'setItems', defaultItems),
  withState('value', 'setValue', ''),
  withHandlers({
    onInputChange: props => ({target: {value}}) => {
      props.setValue(value)
    },
    onSubmit: props => event => {
      event.preventDefault()
      const newItem = {
        key: 't' + Date.now(),
        data: { text: props.value },
      }
      props.setItems([ newItem, ...props.items ])
      props.setValue('')
    },
    getDefaultStyles: props => () => (
      props.items.map(item => ({...item, style: {height: -500, opacity: 10}}))
    ),
    getStyles: ({ items }) => () => (
      items.map((item, i) => ({
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
