import React from 'react'
import PropTypes from 'prop-types'

// ##### ES6 Classes Version #####
//
// class ChatMessage extends React.Component {
//   render() {
//     const {message, upvotes} = this.props
//     return (
//       <p>{upvotes}: {message}</p>
//     )
//   }
// }
//
// ChatMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   upvotes: PropTypes.int
// }
//
// ChatMessage.defaultProps = {
//   upvotes: 0
// }
//
// ##############################


// ##### Stateless functional component version #####
const ChatMessage = ({message, upvotes}) => {
  return (<p>{upvotes}: {message}</p>)
}

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  upvotes: PropTypes.int
}

ChatMessage.defaultProps = {
  upvotes: 0
}
// ##################################################

export default ChatMessage
