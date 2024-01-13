import React, { useState } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify';

import '../styling/Login.css'

const LoginPage = () => {

    const [pageDisplay, setPageDisplay] = useState( 'login' );

    const [ state, setState ] = useState({});
    const { value } = state;

    //general function to change value of inputs
    const changeText = (e) => {
      const { name, value } = e.target;
  
      setState({
        ...state,
        [name]: value
      });
    }

    const toggleDisplay = (e) => {
        setPageDisplay( e.target.value )
    }

    const loginHandler = () => {

    }

    const registerHandler = (e) => {
    }

  return (
    <div className='page-container'>
        <div className="container">
            <div className='left column'>
                <h2>
                    Check your Productivity!
                </h2>
            </div>

            <div className='right column'>
                <h2>
                    CHECKERED
                </h2>

                {
                    pageDisplay == 'login'
                    ?

                    //  START LOGIN FORM  
                    <div>
                        <form>
                            <input
                                type="text"
                                name='username'
                                value={ value }
                                placeholder="username"
                                onChange={ changeText }
                            />
                            <input
                                type="password"
                                name='password'
                                value={ value }
                                placeholder="password"
                                onChange={ changeText }
                            />
                            <button
                                type="submit"
                                onClick={ loginHandler }
                            >
                                Log In
                            </button>

                            <p>
                                OR
                            </p>

                            <button
                                type="button"
                                value="register"
                                onClick={ toggleDisplay }
                            >
                                Register
                            </button>
                        </form>
                    </div>

                    //  END LOGIN FORM

                    : pageDisplay == 'register'
                    ?

                    //  START REGISTER FORM
                    <form>
                        <input
                            type="text"
                            name='firstName'
                            value={ value }
                            placeholder="First Name"
                            onChange={ changeText }
                        />
                        <input
                            type="text"
                            name='lastName'
                            value={ value }
                            placeholder="Last Name"
                            onChange={ changeText }
                        />
                        <input
                            type="tel"
                            name='contactNumber'
                            value={ value }
                            placeholder="Contact Number"
                            onChange={ changeText }
                        />
                        <input
                            type="email"
                            name='email'
                            value={ value }
                            placeholder="email"
                            onChange={ changeText }
                        />
                        <input
                            type="text"
                            name='username'
                            value={ value }
                            placeholder="username"
                            onChange={ changeText }
                        />
                        <input
                            type="password"
                            name='password'
                            value={ value }
                            placeholder="password"
                            onChange={ changeText }
                        />
                        <button
                            type="submit"
                            onClick={ registerHandler }
                        >
                            Sign Up
                        </button>

                        <p>
                            OR
                        </p>

                        <button
                            type="button"
                            value="login"
                            onClick={ toggleDisplay }
                        >
                            LOG IN
                        </button>
                    </form>
                    //  END REGISTER FORM

                    : 

                    //  START CONFIRM SUBMISSION
                    <div>
                        <img
                            src= { require(`../assets/images/SIGN UP CHECK.png`)}
                            alt="email"
                        />
                        <p class="confirmation_text">
                            You've signed up! <br />Please login using the button below.
                        </p>
                        <br />
                        <button
                            type="button"
                            value='login'
                            onClick={ toggleDisplay }
                        >
                            LOGIN
                        </button>
                    </div>
                    //  END CONFIRM SUBMISSION
                }
            </div>
        </div>
    </div>
  )
}

export default LoginPage