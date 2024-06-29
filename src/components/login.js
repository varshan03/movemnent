import React, { useState } from 'react';

import {  message,  } from 'antd';
const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'a' && password === 'a') {
        setTimeout(() => {
            setIsLoggedIn(true); 
            
        }, 300);
      message.success('Login Successfully')
    } else {
        message.error('Invalid Username or password')
    }
  };

  return (
    <div className='login-main'>
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>LOG IN</h1>
        <label className='login-label'>UserName</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className='login-label'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='login-btn' type='submit'>Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
