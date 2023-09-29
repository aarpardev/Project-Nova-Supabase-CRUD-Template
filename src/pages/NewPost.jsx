import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../client';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPost = ({token}) => {
    let navigate = useNavigate()
    let imgPath = '';

    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDescr] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCat, setNewCat] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    useEffect(() => {
        if(!token){
            console.log(`You're not logged in! GTFO`)
            navigate('/')
        } else {
          
        }
      })

async function uploadImage(e) {
  try {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from('images')
      .upload(token.user.id + "/" + uuidv4() + file.name, file);

    if (data) {
      imgPath = `https://qxqttcfaelniqjchzepi.supabase.co/storage/v1/object/public/images/${data.path}`;
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
    
    const addPost = async () => {
        //insert a new post
        const { data, error } = await supabase
        .from('posts')
        .insert({user_id: token.user.id, title: newTitle, description: newDesc, img: imgPath, content: newContent, cat: newCat, url: newUrl, inserted_at: new Date(), author: newAuthor})
        .select();
            if (error) {
                console.error('Error inserting post:', error);
            } else {
                navigate('/dashb')
        }
      };

    return (
        <div>
            <h1>Add A New Post</h1>
            <div style={{ alignItems: 'center' }}>
                <p><input 
                    type="text"
                    placeholder="Post Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                /></p>
                <p><textarea
                    type="text"
                    placeholder="Brief Description"
                    value={newDesc}
                    onChange={(e) => setNewDescr(e.target.value)}
                /></p>
                <p><input type="file" accept="image/jpg" onChange={(e) => uploadImage(e)}/></p>
                <div className="editorContainer">
                    <ReactQuill
                    className="editor"
                    theme="snow"
                    value={newContent}
                    onChange={setNewContent}
                    />
                    </div>
                <p><input
                    type="text"
                    placeholder="Category"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                /></p>
                <p><input
                    type="text"
                    placeholder="url/"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                /></p>
                <p><input
                    type="text"
                    placeholder="Charlene Rosely"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                /></p>
                <p><button onClick={addPost} style={{ marginLeft: '0.5rem' }}>Post To Blog</button></p> 
      </div>
        </div>
    )
}

export default NewPost