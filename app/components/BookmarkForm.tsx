'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBookmark = async () => {
    if (!title || !url) return alert('Fill all fields')

    await supabase.from('bookmarks').insert([
      { title, url, user_id: userId },
    ])

    setTitle('')
    setUrl('')
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Add Bookmark</h3>

      <input
        className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Save Bookmark
      </button>
    </div>
  )
}
