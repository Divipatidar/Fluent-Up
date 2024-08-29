import React from 'react';
import styles from '../style/LessonPage.module.css';


const LessonPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Understanding the Levels</h1>
            <div className={styles.levelsWrapper}>
                <div className={styles.levelCard}>
                    <h2 className={styles.levelTitle}>Beginner</h2>
                    <p className={styles.description}>
                        This level is designed for newcomers. It focuses on basic skills and foundational knowledge.
                    </p>
                </div>
                <div className={styles.levelCard}>
                    <h2 className={styles.levelTitle}>Conversational</h2>
                    <p className={styles.description}>
                        At this level, users develop their conversational skills, aiming to achieve fluency and comfort in everyday discussions.
                    </p>
                </div>
                <div className={styles.levelCard}>
                    <h2 className={styles.levelTitle}>Fluent</h2>
                    <p className={styles.description}>
                        The fluent level is for advanced users who can speak, read, and write with high proficiency and ease.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
