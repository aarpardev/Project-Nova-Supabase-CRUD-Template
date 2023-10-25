import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client';
import moment from "moment";

const Home = () => {
  let navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').order('id', { ascending: true });;
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  }

  const fetchSingle = async (rowId) => {
    try {
      const { data, error } = await supabase.from('posts').select().eq('id', rowId);
      
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        localStorage.setItem('postdata', JSON.stringify(data));
        navigate(`/${rowId}`);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  useEffect(() => {
    fetchPosts()  
  })

    return (
      <div className='homeposts'>
      <div className='postindex'>
        <h1>The Home</h1>
        <div className='postlist'>
        <ul className='postsdata'>
        {posts.map((post) => (
          <li className='singlepost' key={post.id}>
          <div className='featured-img'>
            <img src={!post.img ? './nova.jpg' : post.img} width={'300px'} alt={post.title} />
          </div>
          
          <div className='eachpost'><a onClick={() => fetchSingle(post.id)}><h2>{post.title}</h2></a>
          <p>By {post.author}</p>
          <p>Posted at {moment(post.inserted_at).fromNow()}</p>
          <p>{post.description}</p>
          </div>
          </li>
        ))}
      </ul>
        </div></div>
        <div className='sidebar'>
          <h2>Related Posts</h2>
        </div>
      </div>
    )
  }
  
  export default Home