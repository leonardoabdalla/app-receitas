import React, { useState } from 'react';
import { node } from 'prop-types';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState({
    name: inputValue,
    radio: filter,
  });

  const handleClick = () => {
    setSearch({
      name: inputValue,
      radio: filter,
    });
    console.log(search);
  };

  const contextValue = {
    email,
    updateEmail: (value) => setEmail(value),
    search,
    setSearch,
    inputValue,
    setInputValue,
    filter,
    setFilter,
    handleClick,
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
