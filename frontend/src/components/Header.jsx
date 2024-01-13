import React from 'react';
import { useLoaderData } from 'react-router-dom';

import '../styling/Header.css'

const Header = () => {
    const templateData = useLoaderData();
    console.log(templateData)
  return (
    
    <div class="navbar-container">
        <img
            src=""
            alt="logo"
            class="logo"
        />
        <p class="username"> { templateData.data.message.personalInfo.firstName }</p>
    </div>
  )
}

export default Header