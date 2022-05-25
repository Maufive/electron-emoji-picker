import { FunctionComponent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MessageListProps } from './message.types'
import Message from './message'
import { useMessage } from './use-message'

export const MessageList: FunctionComponent<MessageListProps> = ({
  messages
}) => {
  const { closeMessage } = useMessage()

  return (
    <div
      style={{
        left: '50%',
        transform: 'translate(-50%, 0)'
      }}
      className="absolute bottom-10 z-10 flex gap-4 flex-col place-items-center justify-center"
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            message={message.message}
            onClickClose={closeMessage}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default MessageList
