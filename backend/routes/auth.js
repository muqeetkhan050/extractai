

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const router = express.Router();
// // const bcrypt = require('bcrypt'); // or 'bcryptjs' if you installed that
// // const User = require('../models/User');

// // // Register
// // router.post('/register', async (req, res) => {
// //   console.log("\n=================================");
// //   console.log("🔥 REGISTER ROUTE HIT");
// //   console.log("Received data:", req.body);
  
// //   const { username, email, password } = req.body;

// //   // Validate input
// //   if (!username || !email || !password) {
// //     console.log("❌ Missing fields");
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     console.log("Step 1: Starting password hash...");
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     console.log("✅ Step 1 complete: Password hashed");
    
// //     console.log("Step 2: Creating user object...");
// //     const newUser = new User({ username, email, password: hashedPassword });
// //     console.log("✅ Step 2 complete: User object created");

// //     console.log("Step 3: Saving to database...");
// //     await newUser.save();
// //     console.log("✅ Step 3 complete: User saved!");
    
// //     console.log("🎉 Registration successful!");
// //     console.log("=================================\n");
    
// //     res.status(201).json({ message: 'User registered successfully' });
    
// //   } catch (err) {
// //     console.log("\n🚨🚨🚨 ERROR OCCURRED 🚨🚨🚨");
// //     console.error("Error name:", err.name);
// //     console.error("Error message:", err.message);
// //     console.error("Error code:", err.code);
// //     console.error("Full error:", err);
// //     console.log("=================================\n");

// //     if (err.code === 11000) {
// //       return res.status(400).json({ error: "Username or email already exists" });
// //     }
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Login
// // router.post("/login", async (req, res) => {
// //   console.log("\n=================================");
// //   console.log("🔑 LOGIN ROUTE HIT");
// //   console.log("Login attempt for:", req.body.email);
  
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       console.log("❌ User not found");
// //       return res.status(400).json({ error: "User not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       console.log("❌ Invalid password");
// //       return res.status(400).json({ error: "Invalid credentials" });
// //     }

// //     console.log("✅ Login successful");
// //     console.log("=================================\n");
    
// //     res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');  // ← This imports from models/User.js

// // Register
// router.post('/register', async (req, res) => {
//   console.log("\n=================================");
//   console.log("🔥 REGISTER ROUTE HIT");
//   console.log("Received data:", req.body);
  
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     console.log("❌ Missing fields");
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     console.log("Step 1: Starting password hash...");
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("✅ Step 1 complete: Password hashed");
    
//     console.log("Step 2: Creating user object...");
//     const newUser = new User({ username, email, password: hashedPassword });
//     console.log("✅ Step 2 complete: User object created");

//     console.log("Step 3: Saving to database...");
//     await newUser.save();
//     console.log("✅ Step 3 complete: User saved!");
    
//     console.log("🎉 Registration successful!");
//     console.log("=================================\n");
    
//     res.status(201).json({ message: 'User registered successfully' });
    
//   } catch (err) {
//     console.log("\n🚨🚨🚨 ERROR OCCURRED 🚨🚨🚨");
//     console.error("Error name:", err.name);
//     console.error("Error message:", err.message);
//     console.error("Error code:", err.code);
//     console.error("Full error:", err);
//     console.log("=================================\n");

//     if (err.code === 11000) {
//       return res.status(400).json({ error: "Username or email already exists" });
//     }
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   console.log("\n=================================");
//   console.log("🔑 LOGIN ROUTE HIT");
//   console.log("Login attempt for:", req.body.email);
  
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("❌ User not found");
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("❌ Invalid password");
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     console.log("✅ Login successful");
//     console.log("=================================\n");
    
//     res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("Register error:", err);

    // Handle duplicate username/email
    if (err.code === 11000) {
      res.status(400).json({ error: "Username or email already exists" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user: { username: user.username, email: user.email } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
