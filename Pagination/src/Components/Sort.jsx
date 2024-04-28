import React, { useState } from 'react'

const Sort = ({setUsers}) => {
    const sortOptions=["name","email"];
    const [sortValue,setSortValue]=useState('')
    const handleSort=async(e)=>{
      let value=e.target.value;
        try {
            const res=await fetch(`https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`,{
                method:"GET"
            })
            const data = await res.json(); 
            console.log(data);
            setUsers(data);
            setSortValue(value);
        } catch (error) {
            
        }
    }
  return (
    <div>
      <h2>Sort By:</h2>
      <select onChange={handleSort} value={sortValue}>
        <option>Select</option>
      {sortOptions.map((item,index)=>(
         <option value={item} key={index}>
            {item}
            </option>
      ))}
     </select>
    </div>
  )
}

export default Sort
