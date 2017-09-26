import React from 'react'
import PropTypes from 'prop-types'

import ChatMessage from './chat_message'

const Chat = ({messages}) => {
  console.log(messages)
  let chatstream = messages.map((message, i) => <ChatMessage key={i} message={message.text}/>)
  console.log(chatstream)

  return (<div>{chatstream}</div>)
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired
}

export default Chat
