import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = ({token}) => { 

    return (
        <div>
            <div className='footercontent'>
            <ul className='footerlinks'>
                <li><img src="src/assets/react.svg" alt="logo" /></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/backdoor">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul></div>
        </div>
    )
}

export default Footer