import { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { MessageProps } from './message.types'

interface Props extends MessageProps {
  onClickClose: (message: string) => void
}

const Message: FunctionComponent<Props> = ({ message, onClickClose }) => (
  <motion.div
    layout="position"
    initial={{ opacity: 0, y: -25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -25 }}
    className="flex w-full max-w-xs items-center rounded-lg bg-green-500 py-4 px-6 text-gray-200 shadow-lg"
    role="alert"
  >
    <div className="mx-3 flex-1">
      <p className="text-base">{message}</p>
    </div>
    <button
      type="button"
      className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-green-800/50 p-1.5 text-green-100 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
      aria-label="Close"
      onClick={() => onClickClose(message)}
    >
      <span className="sr-only">Close</span>
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  </motion.div>
)

export default Message
