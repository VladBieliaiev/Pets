import React from 'react'
import {Link} from "react-router-dom";

export const Navigation = () =>{

    return (
        <nav>
            <h1>App</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='contact'>Contact</Link></li>
            </ul>
        </nav>
    )
}