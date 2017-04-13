import { withHandlers, withState, compose, lifecycle } from 'recompose'

import Demo from '../components/Demo'

const defaultTodos =  [
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
  withState('todos', 'setTodos', defaultTodos),
  withState('value', 'setValue', ''),
)(Demo)
