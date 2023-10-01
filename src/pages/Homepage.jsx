import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client';
import moment from "moment";

const Homepage = ({token}) => {
  let navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  
  function handleLogout(){
    localStorage.removeItem('user');
    localStorage.removeItem('postdata');
    sessionStorage.removeItem('token');
    navigate('/');
  }
  
const fetchPosts = async () => {
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: true })
      .eq('user_id', token.user.id);
    
    setPosts(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
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

const fetchEdit = async (rowId) => {
  try {
    const { data, error } = await supabase.from('posts').select().eq('id', rowId);
    
    if (error) {
      console.error('Error fetching post:', error);
    } else {
      localStorage.setItem('postdata', JSON.stringify(data));
	    navigate(`/editpost/`+rowId);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}


const deletePost = async (id) => {
  try {
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

  //Note: don't forget to use this token in the edit post page
  useEffect(() => {
    if(!token){
      navigate('/')
      console.log(`You're not logged in! GTFO`)
    } else {
      fetchPosts()
    }
  })

  return (
    <div>
      <h3>Hi, {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>
      <div className='postlist'>
        <h2>Your Posts</h2>
        <p><Link to='/newpost'>Add New Post</Link></p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}><a onClick={() => fetchSingle(post.id)}><h2>{post.title}</h2></a>
          <div className='featured-img'>
            <img src={!post.img ? './nova.jpg' : post.img} width={'300px'} alt={post.title} />          
          </div>
          <p>Posted: {moment(post.inserted_at).fromNow()}</p>
          <p>{post.description}</p>
          <div style={{ marginLeft: 'none' }}>
                <button onClick={() => fetchEdit(post.id)}>Edit Post</button>
                <button onClick={() => deletePost(post.id)} style={{ marginLeft: 'none' }}>Delete Post</button>
              </div>
          </li>
        ))}
      </ul></div>

    </div>
  )
}

export default Homepage