import React from 'react';
import { useLoaderData } from 'react-router-dom';

import '../styling/Header.css'

const Header = () => {
    const userData = useLoaderData();
  return (
    
    <div class="navbar-container">
        <img
            src=""
            alt="logo"
            class="logo"
        />
        <p class="username"> { userData.data.message.personalInfo.firstName }</p>
    </div>
  )
}

export default Header