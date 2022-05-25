export type MessageType = 'default' | 'success' | 'error'

export interface MessageProps {
  type: MessageType
  message: string
}

export interface MessageListProps {
  messages: MessageProps[]
}
