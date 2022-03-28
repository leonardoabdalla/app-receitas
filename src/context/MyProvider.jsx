import React, { useState } from 'react';
import { node } from 'prop-types';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const contextValue = {
    email,
    updateEmail: (value) => setEmail(value),
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: node.isRequired,
};

export default MyProvider;
