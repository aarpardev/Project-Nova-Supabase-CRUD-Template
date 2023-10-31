import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from '../client';

const Login = ({setToken}) => {
  let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      setToken(data)
      navigate('/dashb')


    //   alert('Check your email for verification link')

      
    } catch (error) {
      document.querySelector('.status').innerHTML = `Wrong email or password`
    }
  }




  return (
    <div className='forms'>
      <form onSubmit={handleSubmit}>
        

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />
        <div className='formactions'>
        <button type='submit'>
          Submit
        </button></div>


      </form>
      Don't have an account? <Link to='/signup'>Sign Up</Link>  <div className='status'></div>
    </div>
  )
}

export default Login