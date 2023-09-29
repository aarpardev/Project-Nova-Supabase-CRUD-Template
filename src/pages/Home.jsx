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
      <div>
        <h1>The Home</h1>
        <div className='postlist'>
        <ul>
        {posts.map((post) => (
          <li key={post.id}><div className='posts'><a onClick={() => fetchSingle(post.id)}><h2>{post.title}</h2></a>
          <div className='featured-img'>
            <img src={!post.img ? 'https://qxqttcfaelniqjchzepi.supabase.co/storage/v1/object/public/images/f7c61ca2-dff8-42b7-aea6-958cab3d525d/357dfc9c-8d49-44e4-b176-3406a169a199nova.jpg' : post.img} width={'300px'} alt={post.title} />
          </div>
          <p>By {post.author}</p>
          <p>Posted at {moment(post.inserted_at).fromNow()}</p>
          <p>{post.description}</p></div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    )
  }
  
  export default Home