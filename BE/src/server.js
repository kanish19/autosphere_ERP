const express = require('express');
const cors = require('cors');

const app = express();

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