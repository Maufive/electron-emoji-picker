import { useEffect, useState } from 'react'
import allEmojis from '../assets/emojis.json'
import { Emoji } from '../types'

const emojis = allEmojis.map((e) => e.emojis).flat()

const getEmojiFromString = (emojisAsString: string) => {
  return emojisAsString
    .split(' ')
    .map((e) => emojis.find((emoji) => emoji.emoji === e))
    .filter(isEmoji)
}

const isEmoji = (emoji: Emoji | undefined): emoji is Emoji => {
  return !!emoji
}

export const useRecentEmojis = () => {
  const [recentEmojis, setRecentEmojis] = useState<Emoji[] | undefined>(
    undefined
  )

  useEffect(() => {
    const recentEmojis = window?.localStorage.getItem('recent_emojis')

    if (recentEmojis) {
      const results = getEmojiFromString(recentEmojis)
      setRecentEmojis(results)
    }
  }, [])

  const updateRecentEmojis = (emoji: string) => {
    // If we don't have any saved emojis in the storage, create the storage and update the state
    if (!recentEmojis) {
      window.localStorage.setItem('recent_emojis', emoji)
      const results = getEmojiFromString(emoji)
      setRecentEmojis(results)

      return
    }

    // If we already have saved emojis - append the new emoji to the start of the string of emojis and save it to storage
    // and then update the state
    let previouslySavedEmojis = window.localStorage.getItem('recent_emojis')

    // Check that the new emoji doesn't already exist
    if (previouslySavedEmojis?.includes(emoji)) {
      previouslySavedEmojis = previouslySavedEmojis
        .split(' ')
        .filter((e) => e !== emoji)
        .join(' ')
      console.log('Emoji already exists in localstorage')
    }

    window.localStorage.setItem(
      'recent_emojis',
      `${emoji} ${previouslySavedEmojis}`.substring(0, 44)
    )

    const results = getEmojiFromString(emoji)

    setRecentEmojis([
      ...results,
      ...recentEmojis.filter((recent) => recent.emoji !== results[0].emoji) // Remove the old instance of that emoji if we are using it again, and instead put it as the most recent
    ])
  }

  return { recentEmojis, updateRecentEmojis }
}

export default useRecentEmojis
