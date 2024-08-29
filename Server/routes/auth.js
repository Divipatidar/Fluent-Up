const express = require('express');
const router = express.Router();
const User = require('../modals/User');
const { v4: uuidv4 } = require('uuid');  // For generating unique user IDs
const UserProgress = require('../modals/Progress'); // Adjust the path as needed

// Signup route
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const userId = uuidv4();  // Generate a unique user ID
        const newUser = new User({ firstName, lastName, email, password, userId });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', userId });
    } catch (error) {
        res.status(500).send({ error: 'Error creating user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.status(200).send({ message: 'Login successful', userId: user.userId,firstName: user.firstName, });
        } else {
            res.status(400).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error logging in' });
    }
});
// Logout route
router.post('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({ error: 'Error logging out' });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).send({ message: 'Logout successful' });
        });
    } catch (error) {
        res.status(500).send({ error: 'Error logging out' });
    }
});
// Example Express.js route for resetting progress
router.post('/reset/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Reset progress in the database
        await UserProgress.updateOne({ userId: userId }, { progress: 0, level: 'beginner' });
        res.status(200).send({ message: 'Progress reset successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error resetting progress' });
    }
});

module.exports = router;
