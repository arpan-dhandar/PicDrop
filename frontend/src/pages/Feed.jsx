import { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {

const [posts, setPosts] = useState([

])

useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res)=>{
        setPosts(res.data.data)
    })
}, [])

    return (
    
    <section className='feed-section'>

{
    posts.length > 0 ? (
        posts.map((post) => (
            <div key={post._id} className='post-card'>
                <img src={post.image} alt={post.caption} />
                <p>{post.caption}</p>
            </div>
        ))
    ) : (
        <p>No posts available.</p>
    )
}

    </section>
  )
}

export default Feed