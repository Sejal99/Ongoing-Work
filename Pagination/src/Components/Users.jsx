import React, { useEffect, useState } from 'react';
import Search from './Search';
import Sort from './Sort';
import Filter from './Filter';
import Pagination from './Pagination';


const Users = () => {
  const [users, setUsers] = useState([]);
  const limit=5;
  const [page,setPage]=useState(1);
  const [totalDocs,setTotalDocs]=useState(limit);
  const [skip,setSkip]=useState(0);
  

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
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>UserName</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(skip, totalDocs).map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.username}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div style={{display:'flex',flexDirection:'row',gap:'50px'}}>
    <Sort setUsers={setUsers}/>
    <Filter setUsers={setUsers}/>
    </div>
    <Pagination setPage={setPage}  page={page} setTotalDocs={setTotalDocs} setSkip={setSkip} limit={limit} totalDocs={totalDocs} users={users}/>
    </div>
  );
};

export default Users;
