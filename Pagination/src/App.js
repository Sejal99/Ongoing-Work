import React from 'react';

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Users from './Components/Users';

function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Users/>}/>
      
      </Routes>
    </Router>
  </div>
  );
}

export default App;
