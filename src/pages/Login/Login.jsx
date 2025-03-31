import React, { useContext, useRef, useState } from 'react';
import { Form, Button, Container, Card, Alert, Toast, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { ChefifyConText } from '../../ChefifyContext';
import InputFloating from '../../layouts/components/InputFloating/InputFloating';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { RiAppleLine } from 'react-icons/ri';
import CheckBox from '../../layouts/components/CheckBox/CheckBox';

let checkSubmit = 0;

const Login = () => {
    const { login, setLogin, users, setUsers } = useContext(ChefifyConText);
    const [formLogin, setFormLogin] = useState({
        username: {
            firstName: '',
            lastName: '',
        },
        email: '',
        password: '',
    });
    const [submit, setSubmit] = useState(false);
    const [fail, setFail] = useState(false);
    const containerRef = useRef();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        checkSubmit = 2;
        e.preventDefault();
        const checkUserName = users.some(
            (users) =>
                formLogin.username.firstName == users.username.firstName &&
                formLogin.username.lastName == users.username.lastName,
        );
        const checkEmail = users.some((users) => formLogin.email == users.email);
        const checkPassword = users.some((users) => formLogin.password == users.password);
        if (checkUserName && checkEmail && checkPassword) {
            navigate('/');
            setLogin(true);
        } else {
            setLogin(false);
            setSubmit(true);
            setTimeout(() => {
                checkSubmit = 0;
                setSubmit(false);
            }, 3000);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        checkSubmit = 1;
        setSubmit(true);
        if (users.some((user) => user.email == formLogin.email)) {
            setFail(true);
        } else {
            setFail(false);
            setUsers([...users, { id: Date.now(), ...formLogin }]);
            setFormLogin({
                username: {
                    firstName: '',
                    lastName: '',
                },
                email: '',
                password: '',
            });
            containerRef.current.classList.remove(styles.active);
        }
        setTimeout(() => {
            checkSubmit = 0;
            setSubmit(false);
        }, 3000);
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;

        setFormLogin((prev) => {
            const keys = name.split('.');
            if (keys.length == 1) {
                if (name === 'username') {
                    const names = value.split(' ');
                    const firstName = names[0];
                    const lastName = names.slice(1).join(' ');
                    return {
                        ...prev,
                        username: {
                            firstName: firstName,
                            lastName: lastName,
                        },
                    };
                } else return { ...prev, [name]: value };
            } else if (keys.length == 2) {
                return {
                    ...prev,
                    [keys[0]]: {
                        ...prev[keys[0]],
                        [keys[1]]: value,
                    },
                };
            }
            return prev;
        });
    };

    const handleChangeSignUp = () => {
        if (containerRef.current) {
            containerRef.current.classList.add(styles.active);
        }
    };

    const handleChangeSignIn = () => {
        if (containerRef.current) {
            containerRef.current.classList.remove(styles.active);
        }
    };

    return (
        <div className="py-5 mt-5">
            {submit && !login && checkSubmit == 2 && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10000,
                    }}
                >
                    <Toast onClose={() => setSubmit(false)}>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Notify</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-danger text-white">Login failed</Toast.Body>
                    </Toast>
                </div>
            )}
            {submit && checkSubmit == 1 && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10000,
                    }}
                >
                    <Toast onClose={() => setSubmit(false)}>
                        <Toast.Header>
                            <strong className={`me-auto ${fail ? 'text-danger' : 'text-success'}`}>Notify</strong>
                        </Toast.Header>
                        <Toast.Body className={`${fail ? 'bg-danger' : 'bg-success'} text-white`}>
                            {fail ? 'Sign up failed or Same an account' : 'Sign up succeed'}
                        </Toast.Body>
                    </Toast>
                </div>
            )}
            <Container ref={containerRef} className={styles.loginContainer}>
                <Card className={styles.loginCard}>
                    <Card.Body>
                        <h2 className="text-center mb-4 fw-bold">Create an account</h2>
                        <Form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                            <InputFloating
                                type="text"
                                id="username"
                                placeholder="nguyen thang minh dat"
                                labelName="Full name"
                                change={handleChangeLogin}
                            />
                            <InputFloating
                                type="email"
                                id="email"
                                placeholder="example.email@gmail.com"
                                labelName="Email"
                                change={handleChangeLogin}
                            />
                            <InputFloating
                                type="password"
                                id="password"
                                placeholder="Enter at least 8+ characters"
                                labelName="Password"
                                change={handleChangeLogin}
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: '416px', height: '40px' }}
                                className={styles.button}
                            >
                                Sign in
                            </Button>
                        </Form>
                        <div className="mt-3 d-flex flex-column gap-2 justify-content-center">
                            <span className="text-center" style={{ color: '#424852' }}>
                                Or sign in with
                            </span>
                            <div className="d-flex justify-content-center gap-3">
                                <Button style={{ color: '#dc3545' }} className={styles.buttonLogo}>
                                    <FaGoogle className="me-2 fs-5" />
                                </Button>
                                <Button style={{ color: '#0d6efd' }} className={styles.buttonLogo}>
                                    <FaFacebookF className="me-2 fs-5" />
                                </Button>
                                <Button style={{ color: '#000000' }} className={styles.buttonLogo}>
                                    <RiAppleLine className="me-2 fs-4" />
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={styles.signupCard}>
                    <Card.Body style={{ paddingRight: '44px' }}>
                        <h2 className="text-center mb-4 fw-bold">Sign up</h2>
                        <Form onSubmit={handleSignup} className="d-flex flex-column gap-3">
                            <div className="d-flex gap-3" style={{ width: '416px' }}>
                                <InputFloating
                                    type="text"
                                    id="username.firstName"
                                    placeholder="Input first name"
                                    labelName="First name"
                                    value={formLogin.username.firstName}
                                    change={handleChangeLogin}
                                />
                                <InputFloating
                                    type="text"
                                    id="username.lastName"
                                    placeholder="Input last name"
                                    labelName="Last name"
                                    value={formLogin.username.lastName}
                                    change={handleChangeLogin}
                                />
                            </div>
                            <InputFloating
                                type="email"
                                id="emailSignup"
                                placeholder="example.email@gmail.com"
                                labelName="Email"
                                value={formLogin.email}
                                change={handleChangeLogin}
                            />
                            <InputFloating
                                type="password"
                                id="passwordSignup"
                                placeholder="Enter at least 8+ characters"
                                labelName="Password"
                                value={formLogin.password}
                                change={handleChangeLogin}
                            />
                            <div className="d-flex gap-3">
                                <CheckBox type={'checkbox'} id={'checkAgree'} />
                                <p style={{ fontSize: '14px' }} className="fw-medium mb-0">
                                    By signing up, I agree with the{' '}
                                    <span style={{ color: '#f44b86' }}>Terms of Use</span> &{' '}
                                    <span style={{ color: '#f44b86' }}>Privacy Policy</span>
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: '416px', height: '40px' }}
                                className={styles.button}
                            >
                                Sign up
                            </Button>
                        </Form>
                        <p style={{ fontSize: '14px' }} className="fw-medium mb-0 text-center mt-3">
                            Already have an account?{' '}
                            <span onClick={handleChangeSignIn} style={{ color: '#f44b86', cursor: 'pointer' }}>
                                Log in
                            </span>
                        </p>
                        <div className="position-relative text-center mt-1">
                            <div className="border-top border-2 position-absolute top-50 w-100"></div>
                            <span className="position-relative bg-white px-1 text-secondary">OR</span>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-1">
                            <Button
                                style={{
                                    backgroundColor: '#dc3545',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                }}
                                className={styles.buttonLogo}
                            >
                                <div className="d-flex align-items-center">
                                    <FaGoogle className="me-2 fs-5" />
                                </div>
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#0d6efd',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                }}
                                className={styles.buttonLogo}
                            >
                                <div className="d-flex align-items-center">
                                    <FaFacebookF className="me-2 fs-5" />
                                </div>
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#000000',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                }}
                                className={styles.buttonLogo}
                            >
                                <div className="d-flex align-items-center">
                                    <RiAppleLine className="me-2 fs-4" />
                                </div>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <div className={styles.toggle_container}>
                    <div className={styles.toggle}>
                        <div className={`${styles.toggle_panel} ${styles.toggle_left}`}>
                            <img
                                src="/src/assets/images/Image 108.png"
                                style={{ width: '400px', marginBottom: '20px' }}
                            />
                            <Button
                                onClick={handleChangeSignIn}
                                variant="primary"
                                type="submit"
                                className={styles.button}
                            >
                                SIGN IN
                            </Button>
                        </div>
                        <div className={`${styles.toggle_panel} ${styles.toggle_right}`}>
                            <img
                                src="/src/assets/images/Image 108.png"
                                style={{ width: '400px', marginBottom: '20px' }}
                            />
                            <Button
                                onClick={handleChangeSignUp}
                                variant="primary"
                                type="submit"
                                className={styles.button}
                            >
                                SIGN UP
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;
