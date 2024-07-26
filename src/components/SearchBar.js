import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
