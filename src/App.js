
// // import './App.css';
// // import Main from './components/Main';
// // import Login from './components/Login';
// // import Register from './components/Register';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // function App() {
// //   const isAuthenticated = localStorage.getItem("isAuthenticated");

// //   return (

// //       {/* Example: Main as a navbar or sidebar */}
    
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //              <Route
// //           path="/Main"
// //           element={
// //             isAuthenticated ? <Main /> : <Navigate to="/" replace />
// //           }
// //         />
// //       </Routes>
 
// //   );
// // }

// // export default App;

// import './App.css';
// import Main from './components/Main';
// import Login from './components/Login';
// import Register from './components/Register';
// import { Routes, Route, Navigate } from 'react-router-dom'; // Remove "BrowserRouter as Router"

// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

//   return (
//     // Remove <Router> wrapper - it's already in index.js!
//     <Routes>
//        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//       <Route path="/register" element={<Register />} />
//       <Route
//         path="/Main"
//         element={
//           isAuthenticated ? <Main /> : <Navigate to="/" replace />
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  // Track login state reactively
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

  return (
    <Routes>
      {/* Pass setIsAuthenticated to Login so it can update App state */}
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Main route */}
      <Route
        path="/Main"
        element={
          isAuthenticated ? <Main /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
