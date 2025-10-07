// import logo from './logo.svg';
// import './App.css';
// import Main from './components/Main';
// import Login from './components/Login';
// import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
// import Register from './components/Register'; 

// function App() {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

  
//     <Main />

//     </Routes>
//     </Router>
//   );
// }

// export default App;
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      {/* Example: Main as a navbar or sidebar */}
      <Main />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
