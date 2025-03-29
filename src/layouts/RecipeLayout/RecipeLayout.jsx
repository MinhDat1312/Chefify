import { Button, Card, Col, Container, Row, Toast } from 'react-bootstrap';
import styles from './RecipeLayout.module.scss';
import { FaRegBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { ChefifyConText } from '../../ChefifyContext';

const RecipeLayout = ({ type, recipes }) => {
    const [success, setSuccess] = useState(true);
    const { login, savedRecipes, setSavedRecipes, navigate } = useContext(ChefifyConText);

    const handleSaveRecipe = (recipe) => {
        if (!login) {
            setSuccess(false);
            setTimeout(() => setSuccess(true), 3000);
        } else {
            const newSavedRecipes = savedRecipes.some((item) => item.id == recipe.id)
                ? savedRecipes.filter((item) => item.id != recipe.id)
                : [...savedRecipes, recipe];
            setSavedRecipes(newSavedRecipes);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%' }}
        >
            {!success && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10000,
                    }}
                >
                    <Toast onClose={() => setSuccess(true)}>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Notify</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-danger text-white">You need to login</Toast.Body>
                    </Toast>
                </div>
            )}

            {type == 'Summer' || type == 'Videos' || type == 'Saved' ? (
                <Container
                    fluid
                    className={`d-flex flex-column justify-content-center align-items-center mx-0 w-100 ${
                        type == 'Saved' ? 'px-0' : 'my-5'
                    }`}
                >
                    {type != 'Saved' && (
                        <div className="mb-4">
                            <h2 className="fw-bold text-center" style={{ color: '#f24c86' }}>
                                {type == 'Summer' ? 'This Summer Recipes' : 'Recipes With Videos'}
                            </h2>
                            <span className="fw-medium text-center">
                                {type == 'Summer'
                                    ? 'We have all your Independence Day sweets covered'
                                    : 'Cooking Up Culinary Creations with Step-by-Step Videos'}
                            </span>
                        </div>
                    )}

                    <Row
                        className="d-flex justify-content-start w-100"
                        style={{ marginBottom: type == 'Saved' ? '28px' : '' }}
                    >
                        {recipes.map((recipe, index) => {
                            const activeSaved = savedRecipes.some((item) => item.id == recipe.id);

                            return (
                                <Card
                                    key={recipe.id}
                                    as={Col}
                                    style={{
                                        marginRight: index == 3 ? '' : '28px',
                                        maxWidth: '320px',
                                        maxHeight: '324px',
                                    }}
                                    className={styles.card}
                                >
                                    <Card.Img
                                        onClick={() => navigate(`/cooking_guide/${recipe.id}`)}
                                        src={`/src/assets/images/recipes/${recipe.image}.png`}
                                        className="w-100"
                                        style={{ maxHeight: '200px' }}
                                    />
                                    <Card.Body className={styles.cardBody}>
                                        <Card.Title className="fw-bold w-75">
                                            <div style={{ width: '190px', height: '80px' }}>{recipe.name}</div>
                                        </Card.Title>
                                        <Button
                                            active={activeSaved}
                                            onClick={() => handleSaveRecipe(recipe)}
                                            className={`${styles.btn} ${activeSaved && login ? styles.active : ''}`}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <FaRegBookmark className="fs-5" />
                                            </div>
                                        </Button>
                                        <div className={styles.cardMinute}>
                                            <span>{Math.floor(Math.random() * 60) + 1} minutes</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                </Container>
            ) : (
                <Container
                    fluid
                    className="d-flex flex-column justify-content-center align-items-center mt-5 mx-0 w-100"
                    style={{ marginBottom: '20px' }}
                >
                    <div className="mb-4">
                        <h2 className="fw-bold text-center" style={{ color: '#f24c86' }}>
                            Editor's pick
                        </h2>
                        <span className="fw-medium text-center">
                            Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
                        </span>
                    </div>
                    <Row className="d-flex justify-content-start w-100">
                        {recipes.map((recipe, index) => {
                            const activeSaved = savedRecipes.some((item) => item.id == recipe.id);
                            return (
                                <Card
                                    key={recipe.id}
                                    as={Col}
                                    xs={6}
                                    style={{
                                        marginRight: index % 2 != 0 ? '' : '28px',
                                        maxWidth: '630px',
                                        position: 'relative',
                                    }}
                                    className={styles.cardEditor}
                                >
                                    <Card.Img
                                        onClick={() => navigate(`/cooking_guide/${recipe.id}`)}
                                        src={`/src/assets/images/recipes/${recipe.image}.png`}
                                        style={{ maxWidth: '40%', height: 'auto' }}
                                    />
                                    <Card.Body className="p-0" style={{ marginLeft: '16px' }}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title className="fw-bold" style={{ fontSize: '24px' }}>
                                                    {recipe.name}
                                                </Card.Title>
                                                <span style={{ color: '#444957' }}>
                                                    {Math.floor(Math.random() * 60) + 1} minutes
                                                </span>
                                            </div>
                                            <Button
                                                onClick={() => handleSaveRecipe(recipe)}
                                                className={`${styles.btnEditor} ${
                                                    activeSaved && login ? styles.activeEditor : ''
                                                }`}
                                            >
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <FaRegBookmark className="fs-5" />
                                                </div>
                                            </Button>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center  gap-2 mt-3">
                                            <img
                                                src={`/src/assets/images/${recipe.editor.avatar}.png`}
                                                style={{ width: '50px' }}
                                            />
                                            <span style={{ color: '#33383d' }} className="fw-medium">
                                                {recipe.editor.name}
                                            </span>
                                        </div>
                                        <p className={styles.paragraphEditor}>{recipe.editor.desc}</p>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                </Container>
            )}
        </motion.div>
    );
};

export default RecipeLayout;
