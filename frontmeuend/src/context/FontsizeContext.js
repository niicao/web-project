import React, { createContext, useState, useContext } from 'react';

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
    const [scale, setScale] = useState(1); 

    const increaseFontSize = () => {
        setScale(prevScale => prevScale * 1.1);
    };

    const decreaseFontSize = () => {
        setScale(prevScale => Math.max(0.8, prevScale / 1.1));
    };

    return (
        <FontSizeContext.Provider value={{ scale, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};