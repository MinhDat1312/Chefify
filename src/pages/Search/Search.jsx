import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import styles from './Search.module.scss';
import Filter from '../../layouts/components/Filter/Filter';
import { useContext, useState } from 'react';
import { ChefifyConText } from '../../ChefifyContext';
import recipes from '../../data/recipes.json';
import { Select } from 'antd';

const Search = () => {
    const { search } = useContext(ChefifyConText);
    const [selected, setSelected] = useState('Sort');

    const searchFilter = recipes.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()));

    const handleChangeSelect = () => {};

    return (
        <Container
            className="d-flex justify-content-start align-items-start px-0 gap-4"
            style={{ margin: '90px 105px 48px' }}
        >
            <Filter />
            <div style={{ width: '70%' }}>
                {searchFilter.length > 0 ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-center fw-bold">
                                {search} ({searchFilter.length})
                            </h2>
                            <Dropdown className={styles.customSelect}>
                                <Dropdown.Toggle variant="outline-danger">{selected}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {['A-Z', 'Z-A'].map((option, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => setSelected(option)}
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
                        </div>
                        <div></div>
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

export default Search;
