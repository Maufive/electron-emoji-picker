/* eslint-disable import/prefer-default-export */
import { motion } from 'framer-motion'

interface Props {
  title: string
  onClick: (children: string) => void
}

export const Card: React.FC<Props> = ({ children, title, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick(children as string)}
      title={title}
      className="h-16 w-16 bg-gray-700 rounded-xl shadow-lg text-center text-4xl relative flex items-center justify-center focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none focus:bg-gray-600 hover:bg-gray-600"
      whileHover={{ scale: 1.1 }}
    >
      {children}
    </motion.button>
  )
}
