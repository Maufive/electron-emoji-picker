import { useState, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'
import TopBar from './components/top-bar'
import { Card } from './components/card'
import allEmojis from './assets/emojis.json'
import { Emoji } from './types'
import { useDebounce, useRecentEmojis } from './hooks'
import { Menu } from './components/menu'
import { MessageList, useMessage } from './components/messages'
import GridTemplate from './components/grid-template'

const emojis = allEmojis.map((e) => e.emojis).flat()

const options = {
  includeScore: true,
  threshold: 0.3,
  keys: ['description']
}

const fuse = new Fuse(emojis, options)

function App() {
  const [currentCategory, setCurrentCategory] = useState<string | null>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce<string>(searchQuery, 200)
  const [searchResults, setSearchResults] = useState<Fuse.FuseResult<Emoji>[]>(
    []
  )
  const { recentEmojis, updateRecentEmojis } = useRecentEmojis()
  const { messages, handleMessage } = useMessage()

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const results = fuse.search(debouncedQuery)

      setSearchResults(results.splice(0, 20))
      setCurrentCategory(null)
      return
    }

    setSearchResults([])
  }, [debouncedQuery])

  const currentCategoryEmojis = useMemo(() => {
    return allEmojis.find((e) => e.category === currentCategory)
  }, [currentCategory])

  const handleClickCategory = (category: string | null) => {
    setCurrentCategory(category)
  }

  const handleChangeInput = (value: string) => {
    setSearchQuery(value)
  }

  const handleClick = async (emoji: string) => {
    // Save to clipboard
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(emoji)
    }

    // Show toast
    handleMessage({ message: `${emoji} copied to clipboard!`, type: 'success' })
    // Save emoji
    updateRecentEmojis(emoji)
  }

  const showSearchResults = searchResults.length > 0
  const showRecentlyUsed = !showSearchResults && !currentCategory
  const showCurrentCategory = !showSearchResults && currentCategory

  return (
    <div className="relative min-h-screen h-full w-screen flex flex-col py-12 bg-slate-800 px-10">
      <MessageList messages={messages} />
      <TopBar />
      <div className="flex gap-10">
        <Menu
          searchQuery={searchQuery}
          onChangeInput={handleChangeInput}
          onClickCategory={handleClickCategory}
          currentCategory={currentCategory}
          hasSearchInput={searchQuery.length > 0}
        />
        <div className="flex flex-col">
          {showSearchResults && (
            <GridTemplate title="Results:">
              {searchResults.map((e) => (
                <Card
                  key={e.item.emoji}
                  title={e.item.description}
                  onClick={handleClick}
                >
                  {e.item.emoji}
                </Card>
              ))}
            </GridTemplate>
          )}
          {showRecentlyUsed && (
            <GridTemplate
              title="Recently used:"
              errorMessage={
                !recentEmojis ? "You don't have any recent emojis 😔" : ''
              }
            >
              {recentEmojis?.map((e) => (
                <Card key={e.emoji} title={e.description} onClick={handleClick}>
                  {e.emoji}
                </Card>
              ))}
            </GridTemplate>
          )}
          {showCurrentCategory && (
            <GridTemplate title={currentCategoryEmojis?.category || ''}>
              {currentCategoryEmojis?.emojis.map((e) => (
                <Card key={e.emoji} title={e.description} onClick={handleClick}>
                  {e.emoji}
                </Card>
              ))}
            </GridTemplate>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
