import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ChefifyConText = createContext();

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
    const [userID, setUserID] = useState('');
    const [savedRecipes, setSavedRecipes] = useState(savedRecipesData);
    const [folderRecipes, setFolderRecipes] = useState(folderRecipesData);
    const [genevieveRecipes, setGenevieveRecipes] = useState(genevieveRecipesData);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [subscribe, setSubscribe] = useState('');
    const url = 'http://localhost:4000';

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
        userID,
        setUserID,
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
        url,
    };

    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
