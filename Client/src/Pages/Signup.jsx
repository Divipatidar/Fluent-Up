import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import styles from '../style/Signup.module.css'; // Import CSS Module

const Signup = ({ setUser }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Password validation
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await axios.post('https://fluent-up-backend.vercel.app/api/signup', {
                firstName,
                lastName,
                email,
                password
            });
            // Check for specific server response indicating user already exists
            if (response.data.error) {
                if (response.data.error === 'Error creating user') {
                    toast.error('User already exists. Please use a different email.');
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            } else {
                console.log('Signup response:', response.data);
                setUser({ userId: response.data.userId, firstName });
                navigate('/');
            }
        } catch (error) {
            // Generic error message for any other issues
            toast.error('Signup error: ' + 'User already exists. Please use a different email.');
            console.error('Signup error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility state
    };

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <h3 className={styles.welcome}>Ready to Begin Your Journey</h3>
                <h2 className={styles.heading}>Signup</h2>
                <form onSubmit={handleSignup} className={styles.form}>
                    <div className={`${styles.inputGroup} ${styles.inputWithIcon}`}>
                        <label className={styles.label}>First Name</label>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={styles.input}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.inputWithIcon}`}>
                        <label className={styles.label}>Last Name</label>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={styles.input}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.inputWithIcon}`}>
                        <label className={styles.label}>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="john@gmail.com"
                            required
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.inputWithIcon}`}>
                        <label className={styles.label}>Password</label>
                        <FontAwesomeIcon icon={faLock} className={styles.icon} />
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="........"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.togglePassword}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button type="submit" className={`${styles.button} ${styles.animatedButton}`}>
                        Signup
                    </button>
                </form>
                <ToastContainer /> {/* Add Toastify container here */}
            </div>
        </div>
    );
};

export default Signup;
