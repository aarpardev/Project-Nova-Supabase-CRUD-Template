import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../client';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = ({token},{title, description, content, cat, url, author}) => {
    let navigate = useNavigate()
    let storedData = JSON.parse(localStorage.getItem('postdata'));
    const postId = storedData[0].id;
    let imgPath = '';

    const [newTitle, setNewTitle] = useState(`${storedData[0].title}`);
    const [newDesc, setNewDescr] = useState(`${storedData[0].description}`);
    const [newContent, setNewContent] = useState(`${storedData[0].content}`);
    const [newCat, setNewCat] = useState(`${storedData[0].cat}`);
    const [newUrl, setNewUrl] = useState(`${storedData[0].url}`);
    const [newAuthor, setNewAuthor] = useState(`${storedData[0].author}`);

    useEffect(() => {
        if(!token){
            console.log(`You're not logged in! GTFO`);
            localStorage.removeItem('postdata');
            navigate('/')
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
    
const editThisPost = async (postId) => {
  try {
    await supabase
      .from('posts')
      .update({
        title: newTitle,
        description: newDesc,
        img: imgPath,
        content: newContent,
        cat: newCat,
        url: newUrl,
        author: newAuthor
      })
      .eq('id', storedData[0].id);
      
      localStorage.removeItem('postdata');
      storedData = '';
      navigate('/dashb');
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

    return (
        <div>
            <h1>Edit Post</h1>
            <div style={{ alignItems: 'center' }}>
                <p><input 
                    type="text"
                    value={newTitle}
                    placeholder={storedData[0].title}
                    onChange={(e) => setNewTitle(e.target.value)}
                /></p>
                <p><textarea
                    type="text"
                    value={newDesc}
                    placeholder={storedData[0].description}
                    onChange={(e) => setNewDescr(e.target.value)}
                /></p>
                <p><input type="file" accept="image/jpg" onChange={(e) => uploadImage(e)}/></p>
                <div className="editorContainer">
                    <ReactQuill style={{maxWidth: "500px"}}
                    className="editor"
                    theme="snow"
                    value={newContent}
                    onChange={setNewContent}
                    />
                    </div>
                <p><input
                    type="text"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                /></p>
                <p><input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                /></p>
                <p><input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                /></p>
                <p><button onClick={editThisPost} style={{ marginLeft: '0.5rem' }}>Save Post</button></p> 
      </div>
        </div>
    )
}

export default EditPost