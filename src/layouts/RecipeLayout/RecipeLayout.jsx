import { Button, Card, Col, Container, Row, Toast } from 'react-bootstrap';
import styles from './RecipeLayout.module.scss';
import { FaRegBookmark, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { ChefifyConText } from '../../context/ChefifyContext';

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

            {type == 'Summer' || type == 'Videos' || type == 'Saved' || type == '' ? (
                <Container
                    fluid
                    className={`d-flex flex-column justify-content-center align-items-center w-100 px-0 ${
                        type == 'Saved' ? 'px-0' : 'my-5'
                    }`}
                    style={{ maxWidth: '1366px' }}
                >
                    {type != 'Saved' && type != '' ? (
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
                    ) : (
                        ''
                    )}

                    <Row
                        className="d-flex justify-content-start w-100 flex-wrap"
                        style={{ marginBottom: type == 'Saved' ? '28px' : '' }}
                    >
                        {recipes.map((recipe, index) => {
                            const activeSaved = savedRecipes.some((item) => item.id == recipe.id);

                            return (
                                <Card
                                    key={recipe.id}
                                    as={Col}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    style={{
                                        marginRight:
                                            type == '' ? (index % 3 == 1 ? '23px' : '') : index == 3 ? '' : '28px',
                                        marginLeft: type == '' ? (index % 3 == 1 ? '23px' : '') : '',
                                        marginBottom: type == '' ? '23px' : '',
                                        width: '320px',
                                        height: '346px',
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
                                        <div className="d-flex justify-content-between">
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
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className={styles.cardMinute}>
                                                <span>{recipe.time} minutes</span>
                                            </div>
                                            <div className={styles.cardType}>
                                                <span>{recipe.type}</span>
                                            </div>
                                            <div className={styles.cardStar}>
                                                <div className="d-flex gap-2">
                                                    {[...Array(recipe.star)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            style={{
                                                                fontSize: '20px',
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
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
                    className="d-flex flex-column justify-content-center align-items-center mt-5 px-0 w-100"
                    style={{ marginBottom: '20px', maxWidth: '1366px' }}
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
                                        maxWidth: '667px',
                                        position: 'relative',
                                    }}
                                    className={styles.cardEditor}
                                >
                                    <Card.Img
                                        onClick={() => navigate(`/cooking_guide/${recipe.id}`)}
                                        src={`/src/assets/images/recipes/${recipe.image}.png`}
                                        style={{ maxWidth: '40%', height: 'auto' }}
                                    />
                                    <Card.Body
                                        className="p-0 d-flex flex-column justify-content-between align-items-start"
                                        style={{ marginLeft: '16px' }}
                                    >
                                        <div className="d-flex justify-content-between w-100">
                                            <div className="w-100">
                                                <Card.Title className="fw-bold" style={{ fontSize: '24px' }}>
                                                    {recipe.name}
                                                </Card.Title>
                                                <span style={{ color: '#444957' }}>{recipe.time} minutes</span>
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
                                        <div className="d-flex justify-content-between w-100">
                                            <div
                                                style={{
                                                    padding: '2px 4px',
                                                    borderRadius: '20px',
                                                    textAlign: 'center',
                                                    backgroundColor: '#fff0f5',
                                                    fontSize: '20px',
                                                    color: '#f24c86',
                                                }}
                                            >
                                                <div className="d-flex gap-2">
                                                    {[...Array(recipe.star)].map((_, index) => (
                                                        <FaStar key={index} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: '2px 4px',
                                                    borderRadius: '20px',
                                                    textAlign: 'center',
                                                    backgroundColor: '#fff0f5',
                                                    fontSize: '16px',
                                                    color: '#f24c86',
                                                }}
                                            >
                                                <span>{recipe.type}</span>
                                            </div>
                                        </div>
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
