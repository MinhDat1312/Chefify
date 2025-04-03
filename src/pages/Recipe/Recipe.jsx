import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import styles from './Recipe.module.scss';
import Filter from '../../layouts/components/Filter/Filter';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChefifyConText } from '../../context/ChefifyContext';
import recipes from '../../data/recipes.json';
import RecipeLayout from '../../layouts/RecipeLayout/RecipeLayout';
import Pagination from '../../layouts/components/Pagination/Pagination';
import { FilterContext } from '../../context/FilterContext';
import { motion } from 'framer-motion';

const Recipe = () => {
    const { search, navigate } = useContext(ChefifyConText);
    const { searchFilter, setSearchFilter, searchRecipe, setSearchRecipe } = useContext(FilterContext);
    const [selected, setSelected] = useState('Sort');
    const [currentPage, setCurrentPage] = useState(1);
    const scrollRef = useRef(null);
    const recipePerPage = 9;

    useEffect(() => {
        const result = recipes.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()));
        setSearchFilter(result);
        setSearchRecipe(result);
    }, [search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter]);

    const currentRecipePage = searchFilter.slice(
        currentPage * recipePerPage - recipePerPage,
        currentPage * recipePerPage,
    );

    const handleChangeSelect = (option) => {
        setSelected(option);

        const filterRecipe = [...searchFilter];

        switch (option) {
            case 'A-Z': {
                filterRecipe.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
                break;
            }
            case 'Z-A': {
                filterRecipe.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
                break;
            }
        }

        setSearchFilter(filterRecipe);
    };

    return (
        <Container
            ref={scrollRef}
            className="d-flex justify-content-start align-items-start px-0 gap-4"
            style={{ marginTop: '108px', marginBottom: '48px', maxWidth: '1366px' }}
        >
            <Filter />
            <div style={{ width: '75%' }}>
                {currentRecipePage.length > 0 ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <h2 className="text-center fw-bold">
                                {search} ({searchFilter.length})
                            </h2>
                            <Dropdown className={styles.customSelect}>
                                <Dropdown.Toggle variant="outline-danger">{selected}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {['A-Z', 'Z-A'].map((option, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleChangeSelect(option)}
                                            onMouseEnter={() => setSelected(option)}
                                            style={{
                                                backgroundColor: selected === option ? '#f24c86' : 'white',
                                                color: selected === option ? 'white' : '#f24c86',
                                            }}
                                        >
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </motion.div>
                        <div style={{ marginTop: '-32px', marginBottom: '-56px' }}>
                            <RecipeLayout type={''} recipes={currentRecipePage} />
                        </div>
                        <Pagination
                            list={searchFilter}
                            perPage={recipePerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            scrollRef={scrollRef}
                        />
                    </>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                        <h2 className="d-flex flex-wrap text-center fw-bold">
                            Sorry, no results were found for "<span className={styles.textParagraph}>{search}</span>"
                        </h2>
                        <img src="/src/assets/images/nothing.png" />
                        <h5 className="fw-medium">We have all your Independence Day sweets covered.</h5>
                        <div className="d-flex gap-3 mt-3">
                            {[
                                { name: 'Sweet Cake', color: '#f44b86', bgColor: '#fff0f5' },
                                { name: 'Black Cake', color: '#8c63e2', bgColor: '#f4f0fe' },
                                { name: 'Pozole Verde', color: '#f44b86', bgColor: '#fff0f5' },
                                { name: 'Healthy Food', color: '#046b81', bgColor: '#eefcff' },
                            ].map((item, index) => (
                                <Button
                                    key={index}
                                    className="rounded-5"
                                    style={{
                                        color: item.color,
                                        backgroundColor: item.bgColor,
                                        border: 'none',
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Recipe;
