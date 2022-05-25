/* eslint-disable import/prefer-default-export */
import { motion } from 'framer-motion'
import allEmojis from '../assets/emojis.json'

const categories = allEmojis.map((e) => e.category)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

interface Props {
  category: string
  onClick: (category: string) => void
  isActive: boolean
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const MenuItem: React.FC<Props> = ({
  children,
  category,
  onClick,
  isActive
}) => {
  return (
    <motion.button
      onClick={() => onClick(children as string)}
      title={category}
      className={classNames(
        `w-full rounded-lg py-2.5 px-5 text-sm text-left font-medium leading-5 text-gray-200 ring-green-400 ring-opacity-60 ring-offset-1 ring-offset-transparent focus:outline-none focus:ring-1 hover:bg-gray-600/25`,
        isActive ? 'bg-gray-500/20' : 'bg-transparent'
      )}
    >
      {children}
    </motion.button>
  )
}

interface MenuProps {
  searchQuery: string
  onClickCategory: (category: string | null) => void
  currentCategory: string | null
  onChangeInput: (value: string) => void
  hasSearchInput: boolean
}

export const Menu: React.FC<MenuProps> = ({
  searchQuery,
  onChangeInput,
  onClickCategory,
  currentCategory,
  hasSearchInput
}) => (
  <div className="flex flex-col">
    <form
      className="flex items-center px-4 my-10 rounded-xl shadow-lg bg-gray-700"
      style={{ minWidth: '50%' }}
    >
      <label htmlFor="search-input" className="text-gray-400">
        <SearchIcon />
      </label>
      <input
        className="flex-auto bg-transparent mx-4 h-14 text-gray-100 border-transparent outline-none"
        aria-autocomplete="both"
        aria-labelledby="search-label"
        id="search-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        enterKeyHint="go"
        spellCheck="false"
        placeholder="Search emojis"
        maxLength={64}
        autoFocus
        type="search"
        value={searchQuery}
        onChange={(e) => onChangeInput(e.currentTarget.value)}
      />
    </form>
    <ul className="flex flex-col rounded-xl bg-gray-900/25 space-y-1 p-1">
      <MenuItem
        category="🔄 Recently used"
        onClick={() => onClickCategory(null)}
        isActive={!currentCategory && !hasSearchInput}
      >
        🔄 Recently used
      </MenuItem>
      {categories.map((category) => (
        <MenuItem
          key={category}
          category={category}
          onClick={onClickCategory}
          isActive={currentCategory === category}
        >
          {category}
        </MenuItem>
      ))}
    </ul>
  </div>
)
