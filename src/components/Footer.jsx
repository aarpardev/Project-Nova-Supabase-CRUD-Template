import React from 'react';
import { Link } from 'react-router-dom'

const Footer = ({token}) => { 

    return (
        <div>
            <h1>Footer</h1>
            <img src="src/assets/react.svg" alt="logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/backdoor">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                
            </ul>
        </div>
    )
}

export default Footer