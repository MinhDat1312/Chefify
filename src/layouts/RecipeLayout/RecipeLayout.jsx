import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styles from './RecipeLayout.module.scss';
import recipes from '../../data/recipes.json';
import { FaRegBookmark } from 'react-icons/fa';

const RecipeLayout = ({ type }) => {
    const start = type == 'Summer' ? 0 : 4;
    const end = type == 'Summer' ? 4 : 8;
    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center my-5 mx-0 w-100">
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
            <Row className="d-flex justify-content-center">
                {recipes.slice(start, end).map((recipe, index) => (
                    <Card
                        key={recipe.id}
                        as={Col}
                        style={{
                            marginRight: index == 3 ? '' : '28px',
                        }}
                        className={styles.card}
                    >
                        <Card.Img src={`/src/assets/images/recipes/${recipe.image}.png`} className="w-100" />
                        <Card.Body className={styles.cardBody}>
                            <Card.Title className="fw-bold w-75">
                                <div style={{ width: '190px', height: '80px' }}>{recipe.name}</div>
                            </Card.Title>
                            <Button className={styles.btn}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <FaRegBookmark style={{ color: '#f24c86' }} className="fs-5" />
                                </div>
                            </Button>
                            <div className={styles.cardMinute}>
                                <span>{Math.floor(Math.random() * 60) + 1} minutes</span>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    );
};

export default RecipeLayout;
