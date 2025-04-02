import { Button, Form, Modal, Toast } from 'react-bootstrap';
import styles from './LoginModal.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { RiAppleLine } from 'react-icons/ri';
import { useContext, useState } from 'react';
import { ChefifyConText } from '../../context/ChefifyContext';

const LoginModal = () => {
    const { loginModal, setLoginModal, setLogin, users } = useContext(ChefifyConText);
    const [email, setEmail] = useState('');
    const [submit, setSubmit] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email != '' && users.some((user) => user.email == email)) {
            setLogin(true);
            setLoginModal(false);
        } else {
            setSubmit(false);
            setTimeout(() => setSubmit(true), 3000);
        }
    };

    return (
        <>
            {!submit && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10000,
                    }}
                >
                    <Toast onClose={() => setSubmit(true)}>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Notify</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-danger text-white">
                            Login failed or You don't have an account
                        </Toast.Body>
                    </Toast>
                </div>
            )}
            <Modal show={loginModal} onHide={() => setLoginModal(false)} centered size="lg">
                <div className="p-0 d-flex h-100">
                    <div
                        style={{
                            backgroundImage: "url('/src/assets/images/Image 72.png')",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '450px',
                            width: '600px',
                            borderRadius: '8px 0 0 8px',
                        }}
                    >
                        <h5 className="text-center text-white mt-5">
                            "Embrace the art of
                            <br />
                            cooking, where flavors
                            <br />
                            come alive!"
                        </h5>
                    </div>
                    <div className="p-3 w-100">
                        <div className="d-flex justify-content-between">
                            <h4 className="fw-bold mb-4">Login</h4>
                            <IoCloseSharp className={styles.btnClose} onClick={() => setLoginModal(false)} />
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Enter your email to log in</Form.Label>
                                <Form.Control
                                    placeholder="Enter your email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    width={100}
                                    style={{ backgroundColor: '#e9ecef' }}
                                    className={styles.no_focus_border}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className={styles.btnContinue}>
                                Continue
                            </Button>
                        </Form>
                        <div className="position-relative text-center mt-4">
                            <div className="border-top border-2 position-absolute top-50 w-100"></div>
                            <span className="position-relative bg-white px-1 text-secondary">OR</span>
                        </div>
                        <div className="text-secondary my-2">
                            <p style={{ fontSize: '14px', textAlign: 'center' }}>
                                By continuing, you agree to the updated{' '}
                                <span className="fw-bold">Terms of Sale, Terms of Service, </span>
                                and <span className="fw-bold">Privacy Policy.</span>
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <Button className={styles.btnContinueWith} style={{ color: '#dc3545' }}>
                                <FaGoogle className="me-2 fs-5" />
                                <span>Continue with Google</span>
                            </Button>
                            <Button className={styles.btnContinueWith} style={{ color: '#0d6efd' }}>
                                <FaFacebookF className="me-2 fs-5" />
                                <span>Continue with Facebook</span>
                            </Button>
                            <Button className={styles.btnContinueWith} style={{ color: '#000000' }}>
                                <RiAppleLine className="me-2 fs-4" />
                                <span>Continue with Apple</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LoginModal;
