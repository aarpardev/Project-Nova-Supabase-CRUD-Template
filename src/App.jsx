import React, { useState, useEffect } from 'react';
import { Home,SignUp, Login, Homepage, NewPost, EditPost, SinglePost } from './pages';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {

 const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])
  

 
  return (
    <div><Navbar />
      <Routes>
        <Route path={'/'} element={ <Home />} />
        <Route path={'/signup'} element={ <SignUp />} />
        <Route path={'/:id'} element={ <SinglePost />} />
        <Route path={'/backdoor'} element={ <Login setToken={setToken}/>} />
        {token?<Route path={'/dashb'} element={ <Homepage token={token} />} />:""}
        {token?<Route path={'/newpost'} element={ <NewPost token={token} />} />:""}
        {token?<Route path={`/editpost/:id`} element={ <EditPost token={token} />} />:""}

      </Routes>
     
      
    </div>
  )
}

export default App