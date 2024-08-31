import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VoiceHandler from '../components/VoiceHandler';
import styles from '../style/Home.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ userId, firstName, setUser }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [hasStartedLearning, setHasStartedLearning] = useState(false);

    const navigate = useNavigate();

    const handleStartLearning = () => {
        setHasStartedLearning(true);  // Show Start Recording button and Progress button
    };

    const stopRecording = () => {
        setIsRecording(false);  // Stop recording and show transcript and response
    };

    const startRecording = () => {
        setIsRecording(true);  // Start recording
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://fluent-up-backend.vercel.app/api/logout', {}, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('User logged out');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        } finally {
            setUser({ userId: null, firstName: '' });
            navigate('/');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Welcome to FluentUp</h1>
                <p style={{ fontSize: '1.5rem', color: '#555', fontWeight: '300', marginTop: '20px', marginBottom: '40px', lineHeight: '1.6', textAlign: 'center', fontFamily: 'cursive', fontStyle: 'italic' }}>
                    Your personal English learning platform.
                </p>
                {!hasStartedLearning && (
                    <button onClick={handleStartLearning}>
                        Start Learning <i className="fas fa-caret-down" style={{ marginLeft: '10px' }}></i>
                    </button>
                )}
                {hasStartedLearning && (
                    <VoiceHandler 
                        userId={userId} 
                        isRecording={isRecording}
                        onStartRecording={startRecording}
                        onStopRecording={stopRecording} 
                    />
                )}
            </div>
            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    userId={userId} 
                    firstName={firstName} 
                    onLogout={handleLogout} 
                />
            </div>
            <div className={styles.hamburgerContainer}>
                <div className={styles.hamburger} onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
