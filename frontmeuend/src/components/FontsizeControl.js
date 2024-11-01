import React from 'react';
import { FontSizeProvider, useFontSize } from '@/context/FontsizeContext.js';


const FontSizeControls = () => {
    const { increaseFontSize, decreaseFontSize } = useFontSize();

    // Styles for the button container
    const containerStyle = {
        position: 'fixed',
        right: '0.4%',
        top: '40%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    // Styles for the buttons
    const buttonStyle = {
        backgroundColor: '#307cec', // Green background
        border: 'none',
        color: 'white',
        padding: '10px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '50%', // This makes the button circular
        width: '40px', // Fixed width
        height: '40px', // Fixed height to match width for a perfect circle
        lineHeight: '20px' // Vertically center the text
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} onClick={increaseFontSize}>+</button>
            <button style={buttonStyle} onClick={decreaseFontSize}>-</button>
        </div>
    );
};

export default FontSizeControls;