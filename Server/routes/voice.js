const express = require('express');
const { generateResponse } = require('./gemini');
const UserHistory = require('../modals/UserHistory');
const UserProgress = require('../modals/Progress');

const router = express.Router();

router.post('/process-voice', async (req, res) => {
    const { userId, transcript } = req.body;
    console.log('Received transcript:', transcript);

    try {
        let aiResponse;
        let level = 'beginner'; // Default level

        if (userId) {
            // Fetch or create user progress
            let userProgress = await UserProgress.findOne({ userId });
            if (!userProgress) {
                userProgress = await UserProgress.create({ userId, level: 'beginner', progress: 0 });
            } else {
                level = userProgress.level;
            }

            // Generate AI response based on the user's current level
            aiResponse = await generateResponse(transcript, level);

            // Update the user history
            const user = await UserHistory.findOne({ userId });
            if (user) {
                user.history.push(transcript);
                await user.save();
            } else {
                await UserHistory.create({ userId, history: [transcript] });
            }

            // Evaluate response correctness and update progress
            if (aiResponse) {
                userProgress.progress += 10; // Example: increase by 1, adjust as needed
                if (userProgress.progress > 100) {
                    userProgress.level = nextLevel(userProgress.level);
                    userProgress.progress = 0;
                }
            }

            await userProgress.save();

            res.json({ response: aiResponse, level: userProgress.level, progress: userProgress.progress });
        } else {
            // Generate AI response using the default "beginner" level
            aiResponse = await generateResponse(transcript, level);
            res.json({ response: aiResponse, level });
        }
    } catch (error) {
        console.error('Error processing voice input:', error);
        res.status(500).send('Error processing voice input');
    }
});

router.get('/progress/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userProgress = await UserProgress.findOne({ userId });
        if (userProgress) {
            res.json({ level: userProgress.level, progress: userProgress.progress });
        } else {
            res.status(404).send('User progress not found');
        }
    } catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).send('Error fetching user progress');
    }
});

// Helper function to determine the next level
const nextLevel = (currentLevel) => {
    const levels = ['beginner', 'conversational', 'fluent'];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[currentIndex + 1] || currentLevel;  // Stay at fluent if already fluent
};

module.exports = router;
