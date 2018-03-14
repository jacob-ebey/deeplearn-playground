import React from 'react'
import ReactDOM from 'react-dom'

import { UX } from './Deeplearn/UX'

import './cytoscapePopupStyles'
import './globalStyles'

ReactDOM.render(
  <UX />,
  document.getElementById('app')
)
module.hot.accept()
