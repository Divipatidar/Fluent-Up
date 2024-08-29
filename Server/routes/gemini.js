require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

// Initialize the Gemini API client
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];
const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 0.7,  // Control the creativity of the response
        maxOutputTokens: 50,
    },
    safetySettings
});

const generateResponse = async (history, level) => {
    console.log("User history received for generating response:", typeof history);
    console.log("Current level:", level);

    let prompt;

    // Customize the prompt based on the user's current level
    switch (level) {
        case 'beginner':
            prompt = `You are an English tutor. The user is at a beginner level. Your task is to help them improve their English communication skills. Based on the following user history: "${history}", if the user speaks correctly, continue the conversation naturally without pointing out correctness. If the user makes a mistake, gently correct their sentence by saying "You said: [user's sentence]. The correct sentence is: [corrected sentence]". Keep the response brief and supportive.`;
            break;
        case 'conversational':
            prompt = `You are an English tutor. The user is at a conversational level. Your task is to help them improve their English communication skills. Based on the following user history: "${history}", if the user speaks correctly, continue the conversation naturally without pointing out correctness. If the user makes a mistake, gently correct their sentence by saying "You said: [user's sentence]. The correct sentence is: [corrected sentence]". Keep the response brief and supportive.`;
            break;
        case 'fluent':
            prompt = `You are an English tutor. The user is at a fluent level. Your task is to help them improve their English communication skills. Based on the following user history: "${history}", if the user speaks correctly, continue the conversation naturally without pointing out correctness. If the user makes a mistake, gently correct their sentence by saying "You said: [user's sentence]. The correct sentence is: [corrected sentence]". Keep the response brief and supportive.`;
            break;
        default:
            prompt = `You are an English tutor. Your task is to help the user improve their English communication skills. Based on the following user history: "${history}", if the user speaks correctly, continue the conversation naturally without pointing out correctness. If the user makes a mistake, gently correct their sentence by saying "You said: [user's sentence]. The correct sentence is: [corrected sentence]". Keep the response brief and supportive.`;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log("Generated response after post-processing:", response);
        return response;
    } catch (error) {
        console.error("Error generating response:", error.message);
        throw new Error("Error generating response");
    }
};

module.exports = { generateResponse };
