import { withHandlers, withState, compose, lifecycle } from 'recompose'

import Demo from '../components/Demo'

export default compose(
  withState('contractedStudents', 'updateContractedStudents', []),
)(Demo)
