


// // import { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'

// // const Login = () => {
// //     const [email, setemail] = useState('')
// //     const [password, setpassword] = useState('')
// //     const [loading,setLoaqding] = useState(false)
// //     const [mesqsage,setMessage] = useState('')
// //     const navigate = useNavigate()

// //     const handleSubmit = (e) => {
// //         e.preventDefault()
// //         setLoaqding(true)
// //         setMessage('')
        
// //       try{
// //         const res=await axios.post("http://localhost:5000/api/auth/login", {email, password});
// //         console.log('login successful',res.data)
// //         setMessage(res.data.message)
// //         setemail('')
// //         setpassword('') 
// //       }catch(error){
// //         console.error('login error',error)
// //         setMessage(error.response?.data?.error || 'Error occurred')
// //       }finally{
// //         setLoaqding(false)
// //     }}

// //     const handleRegisterClick = () => {
// //         navigate('/register')
// //     }

// //     return (
// //         <>
// //             <div className="FrontContent">
// //                 <h1>Login</h1>
// //                 <p>Enter your credentials to access your account.</p> 
// //                 <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', maxWidth:'300px', margin:'0 auto'}}>
// //                     <input 
// //                         type='email' 
// //                         placeholder='Email' 
// //                         value={email} 
// //                         onChange={(e) => setemail(e.target.value)} 
// //                         style={{marginTop:'15px', padding:'10px 20px', borderRadius:'8px', border:'1px solid #ccc', width:'100%'}}
// //                     />
// //                     <br/>
// //                     <input 
// //                         type='password' 
// //                         placeholder='Password' 
// //                         value={password} 
// //                         onChange={(e) => setpassword(e.target.value)} 
// //                         style={{marginTop:'15px', padding:'10px 20px', borderRadius:'8px', border:'1px solid #ccc', width:'100%'}}
// //                     />
// //                     <br/>
// //                     <button 
// //                         type='submit' 
// //                         style={{marginTop:'15px', padding:'10px 20px', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:'#007bff', color:'white', width:'100%'}}
// //                     >
// //                         Login
// //                     </button>
// //                 </form>
                
// //                 <div style={{textAlign:'center', marginTop:'20px'}}>
// //                     <p>Don't have an account?</p>
// //                     <button 
// //                         onClick={handleRegisterClick}
// //                         style={{padding:'10px 20px', borderRadius:'8px', border:'1px solid #007bff', cursor:'pointer', backgroundColor:'white', color:'#007bff'}}
// //                     >
// //                         Register
// //                     </button>
// //                 </div>
// //             </div>   
// //         </>
// //     )
// // }

// // export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       console.log("✅ Login successful:", res.data);

//       setMessage(res.data.message || "Login successful");

//       // Optionally save user info to localStorage
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Redirect to dashboard/home
//       navigate('/Main'); 

//     } catch (err) {
//       console.error("❌ Login error:", err);
//       setMessage(err.response?.data?.error || "Error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="login-input"
//             required
//             disabled={loading}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="login-input"
//             required
//             disabled={loading}
//           />
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {message && (
//           <p className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>
//             {message}
//           </p>
//         )}
//         <div className="register-link">
//           <p>Don't have an account?</p>
//           <button onClick={handleRegisterClick} className="register-button">
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      console.log("✅ Login successful:", res.data);

      // --- ADDED ---
      // Save auth status in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update App.js state immediately
      setIsAuthenticated(true);

      setMessage("Login successful!");
      navigate('/Main'); // Navigate after authentication

    } catch (err) {
      console.error("❌ Login error:", err);
      setMessage(err.response?.data?.error || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="login-input"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="login-input"
            required
            disabled={loading}
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="register-link">
          <p>Don't have an account?</p>
          <button onClick={handleRegisterClick} className="register-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
