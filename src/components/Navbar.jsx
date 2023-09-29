import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    
    return (
        <div className="navbar">
            <img src="src/assets/react.svg" alt="logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/backdoor">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
        </div>
    )
 }

export default Navbar