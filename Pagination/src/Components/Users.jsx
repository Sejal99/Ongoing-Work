import React, { useEffect, useState } from 'react';
import Search from './Search';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'20px' }}>
    <Search setUsers={setUsers}/>
    <div style={{marginTop: '70px', display: 'flex', justifyContent: 'center' }}>
      
      <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 10).map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Users;
