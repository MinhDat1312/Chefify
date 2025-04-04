import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ChefifyConText = createContext();

const usersData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
const savedRecipesData = localStorage.getItem('savedRecipes') ? JSON.parse(localStorage.getItem('savedRecipes')) : [];
const folderRecipesData = localStorage.getItem('folderRecipes')
    ? JSON.parse(localStorage.getItem('folderRecipes'))
    : [];
const genevieveRecipesData = localStorage.getItem('genevieveRecipes')
    ? JSON.parse(localStorage.getItem('genevieveRecipes'))
    : [];

export const ChefifyProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [users, setUsers] = useState(usersData);
    const [savedRecipes, setSavedRecipes] = useState(savedRecipesData);
    const [folderRecipes, setFolderRecipes] = useState(folderRecipesData);
    const [genevieveRecipes, setGenevieveRecipes] = useState(genevieveRecipesData);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [subscribe, setSubscribe] = useState('');

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, [savedRecipes]);

    useEffect(() => {
        localStorage.setItem('folderRecipes', JSON.stringify(folderRecipes));
    }, [folderRecipes]);

    useEffect(() => {
        localStorage.setItem('genevieveRecipes', JSON.stringify(genevieveRecipes));
    }, [genevieveRecipes]);

    const value = {
        loginModal,
        setLoginModal,
        login,
        setLogin,
        users,
        setUsers,
        savedRecipes,
        setSavedRecipes,
        folderRecipes,
        setFolderRecipes,
        genevieveRecipes,
        setGenevieveRecipes,
        navigate,
        search,
        setSearch,
        subscribe,
        setSubscribe,
    };

    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
