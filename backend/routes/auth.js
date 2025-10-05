const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/User')


//Register

router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    const hassedPassword=await bcrypt.hash(password,12)
    const newUser=new User({username,email,password:hassedPassword})
try{
    await newUser.save();
    res.status(201).json({message:'User registered successfully'}) 
}catch(err){
    res.status(500).json({error:'Server error'})
}

})


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;