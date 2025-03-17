import { createContext, useState } from 'react';

export const ChefifyConText = createContext();

export const ChefifyProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [stateButtonLogin, setStateButtonLogin] = useState(false);

    const value = {
        loginModal,
        setLoginModal,
        submitted,
        setSubmitted,
        stateButtonLogin,
        setStateButtonLogin,
    };

    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
