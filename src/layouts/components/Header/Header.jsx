import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChefifyConText } from '../../../context/ChefifyContext';

const Header = () => {
    const loc = useLocation();
    const ref = useRef();
    const { login, navigate, search, setSearch } = useContext(ChefifyConText);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSearch = () => {
        setSearch(ref.current.value);
        navigate('/recipes');
    };

    useEffect(() => {
        ref.current.value = '';
    }, [loc.pathname]);

    return (
        <div>
            <Navbar
                variant="dark"
                expand="lg"
                fixed="top"
                className="justify-content-between bg-white shadow-sm"
                style={{ zIndex: '1000' }}
            >
                <Container className="px-0 ms-5 me-0">
                    <Navbar.Brand style={{ cursor: 'pointer' }}>
                        <img
                            onClick={() => navigate('/home')}
                            src="/src/assets/images/Group 9.png"
                            className="d-inline-block align-top"
                            alt="Chefify logo"
                        />
                    </Navbar.Brand>
                    <InputGroup style={{ width: '350px' }}>
                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={handleSearch}>
                            <img src="/src/assets/images/search.png" />
                        </InputGroup.Text>
                        <Form.Control
                            ref={ref}
                            style={{ backgroundColor: '#e9ecef' }}
                            className={styles.no_focus_border}
                            placeholder="What would you like to cook?"
                            value={search}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            {['What to cook', 'Recipes', 'Ingredients', 'Occasinos', 'About us'].map((item, index) => {
                                const path =
                                    item === 'What to cook'
                                        ? '/home'
                                        : item === 'About us'
                                        ? '/about'
                                        : `/${item.toLowerCase()}`;
                                const isFocus = loc.pathname.startsWith(path);
                                return (
                                    <Nav.Link
                                        key={index}
                                        as={NavLink}
                                        to={path}
                                        className={`${styles.nav_item} ${isFocus ? styles.focusPage : ''}`}
                                    >
                                        {item}
                                    </Nav.Link>
                                );
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <div className="d-flex gap-2 me-5">
                    {login ? (
                        <>
                            <Button
                                onClick={() => navigate('/recipe_box')}
                                style={{
                                    backgroundColor: '#fff0f5',
                                    color: '#ee4c85',
                                    width: '180px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                }}
                                className={styles.btn}
                            >
                                <img src="/src/assets/images/check.png" />
                                Your Recipe Box
                            </Button>
                            <Button
                                onClick={() => navigate('/login')}
                                style={{
                                    position: 'relative',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ position: 'absolute', top: '-4px', left: '-4px' }}
                                >
                                    <img src="/src/assets/images/avatar.png" />
                                </div>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={handleLogin}
                                style={{ backgroundColor: '#fff0f5', color: '#ee4c85' }}
                                className={styles.btn}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate('/recipes/subscribe')}
                                style={{ backgroundColor: '#ee4c85', color: 'white' }}
                                className={styles.btn}
                            >
                                Subscribe
                            </Button>
                        </>
                    )}
                </div>
            </Navbar>
        </div>
    );
};

export default Header;
