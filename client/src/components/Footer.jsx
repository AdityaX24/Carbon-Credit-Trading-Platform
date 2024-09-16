import React from 'react';

const Footer = () => {
    const logoStyle = {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '2rem', // Increased size
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        padding: '0.5rem 1rem',
        border: '3px solid #4CAF50',
        borderRadius: '8px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        letterSpacing: '1px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        marginBottom: '1rem', // Add some space below the logo
    };

    return ( 
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex flex-col justify-center items-center my-4">
                <div style={logoStyle}>
                    Carbon Credit <span style={{ color: 'white', textShadow: 'none' }}>X-Change</span>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-small text-center"> Come Join Us! </p>
                <p className="text-white text-small text-center"> poddar.aditya2014@gmail.com </p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-small text-center"> @Capstone2025 </p>
                <p className="text-white text-small text-center"> Not All rights reserved </p>
            </div>
        </div>
    );
}

export default Footer;