import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({token}) => {

    
    return (
        <div className="navbar">
            <img src="src/assets/react.svg" alt="logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
            </ul>
        </div>
    )
 }

export default Navbar