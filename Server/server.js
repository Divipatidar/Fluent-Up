require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const voiceRoutes = require('./routes/voice');
const { connectDB } = require('./routes/db');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend origin
    credentials: true, // Allow cookies to be sent with requests
}));

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api', voiceRoutes);
app.use('/api', authRoutes);
app.get('/api', (req, res) => {
    res.status(200).json({ "message": "Hello" });
  });
// Connect to the database and start the server
connectDB();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
