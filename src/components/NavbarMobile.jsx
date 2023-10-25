import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

const NavbarMobile = ({token}) => {

    
    return (
        <div className="navbar-mobile">
            <div className='mobile-logo'><img src="src/assets/react.svg" alt="logo" /></div>
            <div className='mobile-menu'><ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
            </ul></div>
        </div>
    )
 }

export default NavbarMobile