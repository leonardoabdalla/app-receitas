import React, { useEffect, useState } from 'react';
import '../css/Login.css';
import loginLogo from '../images/loginLogo.png';

const LoginComponent = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const MIN_PASS_CHARACTER = 6;
    const boolValid = emailRegex
      .test(inputEmail) && (inputPassword.length > MIN_PASS_CHARACTER);

    if (boolValid) return setIsDisabled(false);
    return setIsDisabled(true);
  }, [inputEmail, inputPassword]);

  const handleSubmit = () => {
    const mealsToken = 1;
    const cocktailsToken = 1;
    localStorage.setItem('mealsToken', JSON.stringify(mealsToken));
    localStorage.setItem('cocktailsToken', JSON.stringify(cocktailsToken));
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
    history.push('/foods');
  };

  return (
    <div className="blue-background">
      <img src={ loginLogo } alt="Um prato" className="food-logo" />
      <div className="login-page">
        <h1 className="login-title">Login</h1>
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
          onClick={ () => handleSubmit() }
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </div>
    </div>

  );
};

export default LoginComponent;
