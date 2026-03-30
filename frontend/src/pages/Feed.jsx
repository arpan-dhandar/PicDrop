import { useState, useEffect } from 'react'
import axios from 'axios'
import CardUi from '../component/CardUi' 
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data.data || [])
      })
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-8 md:px-12">
        <h1 className="text-2xl font-black tracking-tighter">PicDrop</h1>
        {/* FIX: Wrapped navigate in an arrow function */}
        <button 
          className="px-5 py-2 border border-zinc-800 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest"
          onClick={() => navigate("/")} 
        >
          + New Drop
        </button>
      </header>

      {/* Grid Container */}
      <main className="px-8 md:px-12 pb-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {posts.map((post) => (
              <CardUi 
                key={post._id} 
                image={post.image} 
                caption={post.caption} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-zinc-600 text-lg font-medium">Your vault is empty</p>
            <p className="text-zinc-800 text-sm mb-6">Start dropping your moments</p>
            {/* FIX: Wrapped navigate in an arrow function */}
            <button 
              className="px-8 py-3 border border-zinc-800 rounded-2xl hover:border-zinc-500 transition-colors" 
              onClick={() => navigate("/")}
            >
              Create First Drop
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Feed