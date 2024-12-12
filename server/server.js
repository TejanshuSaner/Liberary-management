const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Replace with your actual authentication logic
  if (username === "user" && password === "pass") {
    res.status(200).json({ message: "Login successful", token: "your_jwt_token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
