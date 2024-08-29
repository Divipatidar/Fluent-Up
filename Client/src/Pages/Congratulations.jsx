// src/components/Congratulations.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Congratulations.module.css'; // Import the CSS module

const Congratulations = ({ userId }) => {
    const navigate = useNavigate();

    const resetProgress = async () => {
        try {
            await axios.post(`http://localhost:5000/api/reset/${userId}`);
            navigate('/'); // Redirect to the Home page after resetting
        } catch (error) {
            console.error('Error resetting progress:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.confetti}>
                {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 5 + 3}s` }}></div>
                ))}
            </div>
            <h1 className={styles.title}>Congratulations!</h1>
            <p className={styles.message}>You have successfully completed the Fluent level.</p>
            <button className={styles.resetButton} onClick={resetProgress}>
                Reset Progress
            </button>
        </div>
    );
};

export default Congratulations;
