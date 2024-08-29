import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Microphone from '../svgs/Microphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faChartLine } from '@fortawesome/free-solid-svg-icons';

const VoiceHandler = ({ userId, isRecording, onStartRecording, onStopRecording }) => {
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const synth = useRef(window.speechSynthesis);
    const navigate = useNavigate();

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);

            const aiResponse = await getAIResponse(userId, speechResult);
            setResponse(aiResponse);

            if (synth.current.speaking) {
                synth.current.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(aiResponse);
            synth.current.speak(utterance);

            onStopRecording();
        };

        recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            onStopRecording();
        };

        recognition.onend = () => {
            onStopRecording();
        };

        recognition.start();
        onStartRecording();
    };

    const getAIResponse = async (userId, inputText) => {
        try {
            const response = await axios.post('http://localhost:5000/api/process-voice', { userId, transcript: inputText });
            return response.data.response;
        } catch (error) {
            console.error('Error getting AI response:', error);
            return 'Sorry, there was an error processing your request.';
        }
    };

    const navigateToProgressPage = () => {
        navigate('/progress');
    };

    return (
        <div className="voiceHandlerContainer">
            {!isRecording ? (
                <>
                    {transcript || response ? (
                        <div className="resultBox">
                            {transcript && <p className="transcript">Transcript: {transcript}</p>}
                            {response && <p className="response">AI Response: {response}</p>}
                        </div>
                    ) : null}
                    <div className="buttonContainer">
                        <button className="startButton" onClick={startRecording}>
                            <FontAwesomeIcon icon={faMicrophone} /> Start Recording
                        </button>
                        <button className="progressButton" onClick={navigateToProgressPage}>
                            <FontAwesomeIcon icon={faChartLine} /> Progress
                        </button>
                    </div>
                </>
            ) : (
                <div className="recordingContainer">
                    <div className="microphoneContainer">
                        <div className="microphone">
                            <Microphone className="microphoneIcon" />
                            <div className="wave wave1"></div>
                            <div className="wave wave2"></div>
                            <div className="wave wave3"></div>
                        </div>
                    </div>
                    <p>Recording... Please speak now.</p>
                </div>
            )}
            
            <style jsx>{`
                .voiceHandlerContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    margin-top: 20px;
                }

                .resultBox {
                    background-color: #f9f9f9;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                    width: 80%;
                    max-width: 500px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: left;
                }

                .buttonContainer {
                    display: flex;
                    gap: 20px;
                    margin-top: 40px; /* Increased margin for more space */
                }

                .startButton, .progressButton {
                    background-color: red;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 12px 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow to buttons */
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .startButton:hover, .progressButton:hover {
                    opacity: 0.9;
                    transform: translateY(-2px); /* Slight lift on hover */
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
                }

                .recordingContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .microphoneContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                }

                .microphone {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .microphoneIcon {
                    width: 40px;
                    height: 40px;
                    z-index: 2;
                }

                .wave {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(182, 132, 132, 0.5);
                    animation: waveAnimation 1.5s infinite;
                    opacity: 0;
                }

                .wave1 {
                    width: 60px;
                    height: 60px;
                }

                .wave2 {
                    width: 80px;
                    height: 80px;
                    animation-delay: 0.5s;
                }

                .wave3 {
                    width: 100px;
                    height: 100px;
                    animation-delay: 1s;
                }

                @keyframes waveAnimation {
                    0% {
                        transform: scale(0.8);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                .transcript, .response {
                    color: black;
                    font-style: italic;
                    margin-bottom: 10px;
                }

                .transcript {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default VoiceHandler;
