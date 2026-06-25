import React, { useState, useEffect } from 'react';
import '../style/loading.scss';

const phrases = [
    "Analyzing your profile...",
    "Reviewing the job description...",
    "Aligning your skills...",
    "Architecting your interview strategy...",
    "Generating custom technical questions...",
    "Preparing behavioral questions...",
    "Building your roadmap...",
    "Finalizing your plan..."
];

const LoadingScreen = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="modern-loading-screen">
            <div className="loader-container">
                <div className="spinner"></div>
                <div className="phrase-container">
                    <h2 key={index} className="animated-phrase">{phrases[index]}</h2>
                </div>
                <p className="loading-subtext">This usually takes about 30 seconds.</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
