import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import DOMPurify from 'dompurify';
import moment from "moment";

const SinglePost = () => {
    let storedData = JSON.parse(localStorage.getItem('postdata'));
    const postId = storedData[0].id;
    const [posts, setPosts] = useState([]);

    const fetchSingle = async (rowId) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('id', rowId);
            
            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
  
  useEffect(() => {
      fetchSingle(postId)
  })



return (
  <article>
        {posts.map((post) => (
          <div className='post-block' key={post.id}><h2>{post.title}</h2>
          <h3>{post.description}</h3>
          <div className='featured-img'>
            <img src={!post.img ? 'https://qxqttcfaelniqjchzepi.supabase.co/storage/v1/object/public/images/f7c61ca2-dff8-42b7-aea6-958cab3d525d/357dfc9c-8d49-44e4-b176-3406a169a199nova.jpg' : post.img} width={'300px'} alt={post.title} />
          </div>
          <p>By {post.author} Posted {moment(post.inserted_at).fromNow()}</p>
          <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p> 
          </div>
        ))}
      </article>
)
}

export default SinglePost;