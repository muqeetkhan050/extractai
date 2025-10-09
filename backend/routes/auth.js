const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/User')


// //Register
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
    
//   } catch (err) {
//     console.error("Register error:", err);

//     if (err.code === 11000) {
//       res.status(400).json({ error: "Username or email already exists" });
//     } else {
//       res.status(500).json({ error: err.message });
//     }
//   }
// });
router.post('/register', async (req, res) => {
  console.log("=================================");
  console.log("📥 Registration attempt received");
  console.log("Request body:", req.body);
  
  const { username, email, password } = req.body;

  // Check if all fields are present
  if (!username || !email || !password) {
    console.log("❌ Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("🔐 Starting password hash...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");
    
    console.log("💾 Creating user object...");
    const newUser = new User({ username, email, password: hashedPassword });
    console.log("User object created:", { username, email });
    
    console.log("💽 Attempting to save to database...");
    await newUser.save();
    console.log("🎉 User saved successfully!");
    
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (err) {
    console.log("=================================");
    console.error("❌❌❌ REGISTRATION ERROR ❌❌❌");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Full error:", err);
    console.log("=================================");

    if (err.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }
    
    res.status(500).json({ error: err.message || "Registration failed" });
  }
});

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