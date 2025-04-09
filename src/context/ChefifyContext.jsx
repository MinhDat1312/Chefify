import axios from 'axios';
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
    const [user, setUser] = useState(null);
    const [savedRecipes, setSavedRecipes] = useState(savedRecipesData);
    const [folderRecipes, setFolderRecipes] = useState(folderRecipesData);
    const [genevieveRecipes, setGenevieveRecipes] = useState(genevieveRecipesData);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [subscribe, setSubscribe] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const url = 'http://localhost:4000';

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                if (!token) {
                    setUser(null);
                    return;
                }

                const response = await axios.get(`${url}/api/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.user);
            } catch (error) {
                console.error(error);
                setUser(null);
            }
        };

        getCurrentUser();
    }, [token]);

    useEffect(() => {
        if (user != null) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [user]);

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
        user,
        setUser,
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
        setToken,
    };

    return <ChefifyConText.Provider value={value}>{children}</ChefifyConText.Provider>;
};
