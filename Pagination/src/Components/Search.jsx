import React, { useState } from 'react';

const Search = ({setUsers}) => {
  const [value, setValue] = useState('');
 

  const handleSearch = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${value}`);
      const data = await res.json(); 
      console.log(data);
      setUsers(data); // Set the user data to the state
      setValue(""); // Clear the input field after search
    } catch (error) {
      console.error("Error searching:", error);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        name='search'
        placeholder='Search by name'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
