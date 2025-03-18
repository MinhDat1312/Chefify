import { createContext, useEffect, useState } from 'react';

export const ChefifyConText = createContext();

const usersData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

export const ChefifyProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [users, setUsers] = useState(usersData);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const value = {
        loginModal,
        setLoginModal,
        login,
        setLogin,
        users,
        setUsers,
    };

    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
