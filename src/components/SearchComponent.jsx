import React from 'react';

const SearchComponent = () => (
  <div>
    <input
      placeholder="Search..."
      type="text"
      id="searchInput"
      name="searchInput"
      data-testid="search-input"
    />
  </div>
);

export default SearchComponent;
