
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginSection from './components/LoginSection'
import BookmarkForm from './components/BookmarkForm'
import BookmarkList from './components/BookmarkList'

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) fetchBookmarks(data.session.user.id)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (session) fetchBookmarks(session.user.id)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const fetchBookmarks = async (userId: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    if (!session) return

    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        () => fetchBookmarks(session.user.id)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setBookmarks([])
  }

  if (!session) return <LoginSection />

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Welcome {session.user.email}
          </h2>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <BookmarkForm userId={session.user.id} />
        <BookmarkList bookmarks={bookmarks} />

      </div>
    </div>
  )
}
