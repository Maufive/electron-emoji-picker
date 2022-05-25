import { createContext, FunctionComponent, useState } from 'react'
import { MessageProps } from './message.types'

export interface MessageContextProps {
  messages: MessageProps[]
  handleMessage: (args: MessageProps) => void
  closeMessage: (message: string) => void
}

const INITIAL_STATE = {
  messages: [],
  handleMessage: () => {},
  closeMessage: () => {}
}

export const MessageContext = createContext<MessageContextProps>(INITIAL_STATE)

export const MessageProvider: FunctionComponent = ({ children }) => {
  const [messages, setMessages] = useState<MessageProps[]>([])

  const handleMessage = (message: MessageProps) => {
    setMessages((prevMessages) => prevMessages.concat([message]))

    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.slice(1))
    }, 5000)
  }

  const closeMessage = (message: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((oldMessage) => oldMessage.message === message)
    )
  }

  return (
    <MessageContext.Provider value={{ messages, handleMessage, closeMessage }}>
      {children}
    </MessageContext.Provider>
  )
}
