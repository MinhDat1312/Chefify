import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import styles from './RecipeBox.module.scss';
import { PiGreaterThanBold, PiShareFatLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { ChefifyConText } from '../../ChefifyContext';
import RecipeLayout from '../../layouts/RecipeLayout/RecipeLayout';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RecipeBox = () => {
    const { savedRecipes, setSavedRecipes, folderRecipes, setFolderRecipes, genevieveRecipes, setGenevieveRecipes } =
        useContext(ChefifyConText);
    const navigate = useNavigate();
    const [type, setType] = useState('Saved Recipes');
    const [tabRecipes, setTabRecipes] = useState(savedRecipes);
    const [currentPage, setCurrentPage] = useState(1);
    const ulRef = useRef(null);
    const recipePerPage = 8;
    const recipePerRow = 4;

    const currentRecipePerPage = tabRecipes.slice(
        currentPage * recipePerPage - recipePerPage,
        currentPage * recipePerPage,
    );

    const rows = [];
    for (let i = 0; i < currentRecipePerPage.length; i += recipePerRow) {
        rows.push(currentRecipePerPage.slice(i, i + recipePerRow));
    }

    const handleChangeTab = (tab) => {
        setType(tab);
        tab == 'Saved Recipes'
            ? setTabRecipes(savedRecipes)
            : tab == 'Folder'
            ? setTabRecipes(folderRecipes)
            : setTabRecipes(genevieveRecipes);
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
        ulRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleNextPage = () => {
        if (currentPage + 1 > Math.ceil(savedRecipes.length / recipePerPage)) {
            setCurrentPage(1);
        } else {
            setCurrentPage((prev) => prev + 1);
        }
        ulRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handlePrevPage = () => {
        if (currentPage - 1 <= 0) {
            setCurrentPage(Math.ceil(savedRecipes.length / recipePerPage));
        } else {
            setCurrentPage((prev) => prev - 1);
        }
        ulRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <Container
            className="d-flex flex-column justify-content-start align-items-start px-0"
            style={{ margin: '90px 105px 48px' }}
        >
            <div>
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Emma Gonzalez's Recipe Box</h2>
                </motion.div>
                <div className="d-flex gap-5 mt-4">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src="/src/assets/images/avatar_big.png" />
                    </motion.div>
                    <div className="d-flex flex-column justify-content-between">
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ color: '#444a53' }}
                        >
                            Emma Gonzalez is a deputy editor at Chefify, bringing her expertise as a former cooking
                            editor at The Los Angeles Times. She is also an accomplished author, contributing to
                            numerous cookbooks and food publications. Originally from East Los Angeles, Emma now resides
                            in New York City, where she explores a wide range of culinary delights.
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="d-flex justify-content-start align-items-center gap-4"
                        >
                            <span style={{ color: '#f24c86' }} className="fw-medium">
                                6.5k Subscribes
                            </span>
                            <Button className={styles.btn}>
                                <span>Share</span>
                                <PiShareFatLight className="fs-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className={styles.tabContainer}>
                <ul ref={ulRef}>
                    {['Saved Recipes', 'Folders', 'Recipes by Genevieve'].map((tab, i) => (
                        <li
                            onClick={() => handleChangeTab(tab)}
                            key={tab}
                            className={`${tab == type ? styles.active : ''}`}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
                {tabRecipes.length > 0 ? (
                    <>
                        <div>
                            {rows.map((row, index) => (
                                <RecipeLayout key={index} type={'Saved'} recipes={row} />
                            ))}
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-3">
                            <div onClick={handlePrevPage} className="d-flex justify-content-center align-items-center">
                                <FaLessThan style={{ color: '#62676d', cursor: 'pointer' }} />
                            </div>
                            {[...Array(Math.ceil(tabRecipes.length / recipePerPage))].map((_, index) => (
                                <Button
                                    key={index}
                                    variant="outline-none"
                                    className="fw-medium"
                                    style={
                                        currentPage === index + 1
                                            ? {
                                                  backgroundColor: '#f24c86',
                                                  color: '#ffffff',
                                                  border: '2px solid #f24c86',
                                              }
                                            : {
                                                  backgroundColor: 'transparent',
                                                  color: '#e0e1e6',
                                                  border: '2px solid #e0e1e6',
                                              }
                                    }
                                    onClick={() => handleChangePage(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <div onClick={handleNextPage} className="d-flex justify-content-center align-items-center">
                                <FaGreaterThan style={{ color: '#62676d', cursor: 'pointer' }} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center fw-medium">
                        <h2 style={{ color: '#f24c86' }}>{`Your ${
                            type == 'Saved Recipes' ? 'Recipe Box' : type == 'Folders' ? 'Folders' : 'Genevieve'
                        } is empty`}</h2>
                        <img src="/src/assets/images/nothing.png" />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default RecipeBox;
