import React from 'react';

const TypingPage = () => {
    return (
        <div style={{ margin: 0, padding: 0 }}>
            <iframe
                src="https://sensational-cheesecake-981147.netlify.app/"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 9999,
                }}
                title="TypingUp"
            />
        </div>
    );
};

export default TypingPage;
