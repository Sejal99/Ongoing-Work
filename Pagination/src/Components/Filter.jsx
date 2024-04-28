import React, { useState } from "react";

const Filter = ({ setUsers }) => {
  const handleFilter = async (minId, maxId) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      const filteredUsers = data.filter(user => user.id >= minId && user.id <= maxId);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Filter by ID</h2>
      <button onClick={() => handleFilter(1, 5)}>1-5</button>
      <button onClick={() => handleFilter(6, 10)}>6-10</button>
    </div>
  );
};

export default Filter;
