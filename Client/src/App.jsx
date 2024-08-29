import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Typing from './Pages/Typing';
import styles from './App.module.css';
import ProgressTracker from './components/ProgressTracker';
import LessonPage from './Pages/LessonPage';
import { ToastContainer } from 'react-toastify';
import Congratulations from './Pages/Congratulations';

function App() {
  // Retrieve user data from localStorage or initialize as empty
  const storedUser = JSON.parse(localStorage.getItem('user')) || { userId: null, firstName: '' };
  
  const [user, setUser] = useState(storedUser);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={isDarkMode ? styles.dark : styles.light}>
      <Router>
        <div className={styles.toggle}>
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            onClick={toggleDarkMode}
            size="2x"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <ToastContainer /> 

        <Routes>
          <Route path="/" element={<Home userId={user.userId} firstName={user.firstName} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/progress" element={<ProgressTracker userId={user.userId} />} />
          <Route path="/lessons" element={<LessonPage />} />
          <Route path="/congratulations" element={<Congratulations userId={user.userId} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
