import React from 'react'
import {render} from 'react-dom'

import FancyChat from './components/chat'

const doRender = () => render(
  <div>
    <div id="room"></div>
    <div id="chat"></div>
    <FancyChat />
  </div>,

  document.getElementById('root')
)

doRender()
