# Smart Bookmark App

A **Next.js + Supabase** bookmark app with realtime updates and Google login.  
Built with **Next.js App Router**, **Supabase Auth & Database**, and **Tailwind CSS** for styling.  

## Live Demo

https://smart-bookmark-app-blue-one.vercel.app/

---

## Features

- Google Login with Supabase Auth
- Add, Delete bookmarks
- Realtime updates across multiple tabs
- Responsive UI with Tailwind CSS

---

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Supabase (Auth, Database, Realtime)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## Setup Instructions


# Install Dependencies

# Supabase Setup

Create a project on Supabase
Create a table bookmarks with columns
Enable Realtime for the table.
Go to Authentication → URL Configuration
Add your app URL for Site URL and Redirect URLs.

#Clone the Repo

# Deployment on Vercel

Go to Vercel
 → Import Git Repository.
Select smart-bookmark-app.
Add Environment Variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Deploy.
Make sure Supabase URL Configuration includes the deployed Vercel URL.



# Problems I Faced and How I Solved Them

1- Supabase UI Complexity

Initially, navigating the Supabase dashboard and setting up authentication, RLS policies, and Realtime was confusing.

Solved by referring to multiple platforms, tutorials, and Supabase docs to configure table and policies correctly.

2 -Tailwind CSS Not Working Initially

Installed manually using npm install -D tailwindcss postcss autoprefixer

Initialized with npx tailwindcss init -p

Added @tailwind base; @tailwind components; @tailwind utilities; to globals.css

3 - Realtime Updates Not Working

Fixed by subscribing to the bookmarks table using Supabase channel in useEffect

Called fetchBookmarks on payload to update state
How it works:
Supabase Realtime allows the app to listen to changes in the database as they happen.
By subscribing to the bookmarks table via a Supabase channel, the app automatically updates the React state whenever a bookmark is inserted, updated, or deleted.
This ensures the bookmark list updates instantly across all open tabs without refreshing the page.


git clone https://github.com/Sayona-P/smart-bookmark-app.git
cd smart-bookmark-app
