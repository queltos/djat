import React from 'react'

const ChatInput = ({onSend}) => <div>
  <input id="msgInput" onKeyDown={
    function (event) {
      if (event.keyCode === 13) onSend()
    }
  }/>
</div>

export default ChatInput
