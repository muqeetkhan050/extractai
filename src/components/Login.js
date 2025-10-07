
import { useState } from 'react'

const Login=()=>{

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log({email,password})
    }

    return(
        <>
        <div className="FrontContent">
      <h1>Login</h1>
      <p>Enter your credentials to access your account.</p> 
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:'300px',margin:'0 auto'}}>
        <input type='email' placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)} style={{marginTop:'15px',padding:'10px 20px',borderRadius:'8px',border:'1px solid #ccc',width:'100%'}}/>
        <br/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} style={{marginTop:'15px',padding:'10px 20px',borderRadius:'8px',border:'1px solid #ccc',width:'100%'}}/>
        <br/>
        <button type='submit' style={{marginTop:'15px',padding:'10px 20px',borderRadius:'8px',border:'none',cursor:'pointer'}}>Login</button>
      </form>
      </div>   
           </>
    )
}


export default Login