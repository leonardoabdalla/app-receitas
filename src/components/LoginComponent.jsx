import React, { useState } from 'react';

const LoginComponent = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  console.log(inputEmail);
  console.log(inputPassword);

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        onChange={ ({ target }) => setInputEmail(target.value) }
        data-testid="email-input"
        placeholder="email"
      />
      <input
        type="password"
        onChange={ ({ target }) => setInputPassword(target.value) }
        data-testid="password-input"
        placeholder="senha"
      />
      <button
        type="button"
        onClick={ () => console.log('oi') }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </>

  );
};
export default LoginComponent;
