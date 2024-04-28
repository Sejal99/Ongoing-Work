import React, { useState, useEffect } from "react";

const Pagination = ({ page, setPage, setTotalDocs, setSkip, limit ,totalDocs,users}) => {
  
  useEffect(() => {
    setSkip(limit * (page - 1));
    setTotalDocs(page * limit);
  }, [page]);


const totalPages=Math.ceil((users.length)/limit);

  const handleNext = () => {
    console.log(page,totalPages);
    if(page<totalPages){
    setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if(page>1){
    setPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
      <button onClick={handlePrev}>Previous</button>
      <div>{page}</div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
