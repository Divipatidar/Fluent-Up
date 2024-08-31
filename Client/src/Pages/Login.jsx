import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style/Login.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'; // Example icon

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://fluent-up-backend.vercel.app/api/login', { email, password });
            const { userId, firstName } = response.data;
            setUser({ userId, firstName });
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div class="center-wrapper">
        <div className={styles.box}>
            <div className={styles.container}>
                <h3 className={styles.welcome}>Welcome back to</h3>
                <h2 className={styles.heading}>
                <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '10px' }} />

                    FluentUp</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <div className={styles.inputWithIcon}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="john@gmail.com"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWithIcon}>
                            <FontAwesomeIcon icon={faLock} className={styles.icon} />
                            <input
                                type={showPassword ? "text" : "password"} // Toggle input type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="........"
                                className={styles.input}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={`${styles.button} ${styles.animatedButton}`}>Login</button>
                </form>
            </div>
        </div>
        </div>

    );
};

export default Login;
