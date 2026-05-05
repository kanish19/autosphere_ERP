const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');   // ✅ ADD THIS
const connectDB = require('./config/db');

// Load env variables
dotenv.config();                    // ✅ VERY IMPORTANT (MUST BE BEFORE DB)

const app = express();

// Connect to DB
connectDB();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});