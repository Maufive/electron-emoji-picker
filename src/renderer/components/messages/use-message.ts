/* eslint-disable import/prefer-default-export */
import { useContext } from 'react'
import { MessageContext } from './message-context'

export const useMessage = () => {
  const context = useContext(MessageContext)

  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageContext.Provider')
  }

  return context
}
