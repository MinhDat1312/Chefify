import { createContext } from 'react';

export const ChefifyConText = createContext();

export const ChefifyProvider = ({ children }) => {
    const value = {};
    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
