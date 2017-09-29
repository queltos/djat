import React from 'react'
import PropTypes from 'prop-types'

const ChatInput = ({onInput}) => <div>
  <input id="msgInput" onKeyDown={
    function (event) {
      if (event.keyCode === 13) {
        console.log(`target.value is ${event.target.value}`)
        onInput(event.target.value)
        event.target.value = ""
      }
    }
  }/>
</div>

ChatInput.propTypes = {
  onSend: PropTypes.func
}

ChatInput.defaultProps = {
  onInput: f => f
}

export default ChatInput
