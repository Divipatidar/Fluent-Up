import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/Sidebar.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faTachometerAlt, faUserCircle, faSignOutAlt, faSignInAlt, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, firstName, userId, onLogout }) => {
    const navigate = useNavigate();

    const handleTypingUpClick = (e) => {
        e.preventDefault();
        navigate('/typing');
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
            <h4 className={styles.header}>
            <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '10px' }} />

                FluentUp</h4>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/">
                        <FontAwesomeIcon icon={faHome} className={styles.navIcon} /> Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/lessons">
                        <FontAwesomeIcon icon={faBook} className={styles.navIcon} /> Lessons
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/progress">
                        <FontAwesomeIcon icon={faTachometerAlt} className={styles.navIcon} /> Progress
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <a className={styles.navLink} href="/" onClick={handleTypingUpClick}>
                        <FontAwesomeIcon icon={faBook} className={styles.navIcon} /> TypingUp
                    </a>
                </li>
                {!userId && (
                    <li className={styles.navItem}>
                        <Link className={styles.navLink} to="/signup">
                            <FontAwesomeIcon icon={faUserCircle} className={styles.navIcon} /> Sign Up
                        </Link>
                    </li>
                )}
            </ul>
            <div className={styles.profileSection}>
                {userId ? (
                    <>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" className={styles.profilePicture} />
                        <span className={styles.profileName}>{firstName}</span>
                        <button className={styles.logoutButton} onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </>
                ) : (
                    <button className={styles.loginButton} onClick={() => navigate('/login')}>
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
