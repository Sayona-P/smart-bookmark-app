'use client'

import { supabase } from '@/lib/supabase'

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: any[]
}) {
  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Your Bookmarks</h3>

      <div className="space-y-3">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded border"
          >
            <a
              href={b.url}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {b.title}
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
