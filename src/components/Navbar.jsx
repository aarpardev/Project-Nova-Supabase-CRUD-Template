import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = ({token}) => {

    
    return (
        <div className="navbar">
            <div className='thelogo'><img src="src/assets/react.svg" alt="logo" /></div>
            <div className='topmenu'><ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
            </ul></div>
        </div>
    )
 }

export default Navbar