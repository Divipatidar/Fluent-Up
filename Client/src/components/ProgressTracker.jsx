import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import styles from '../style/ProgressTracker.module.css';

const ProgressTracker = ({ userId }) => {
    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState('beginner');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            toast.info('User ID is missing! Please log in to track progress.');
            return;
        }

        const fetchUserProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
                const { progress, level } = response.data;
                setProgress(progress);
                setLevel(level);

                if (level === 'fluent' && progress === 100) {
                    navigate('/congratulations'); // Redirect to Congratulations page
                }
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };

        fetchUserProgress();
    }, [userId, navigate]);

    const goToHome = () => {
        navigate('/');
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <h2 className={styles.level}>Current Level: {level}</h2>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                </div>
                <p className={styles.progressText}>{progress}% completed</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.homeButton} onClick={goToHome}>
                        Go Back to Home
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProgressTracker;
