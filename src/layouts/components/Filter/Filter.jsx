import { useContext, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './Filter.module.scss';
import { Slider } from 'antd';
import { FaStar } from 'react-icons/fa';
import { FilterContext } from '../../../context/FilterContext';

const Filter = () => {
    const {
        selectedTypes,
        setSelectedTypes,
        timeRange,
        setTimeRange,
        selectedRatings,
        setSelectedRatings,
        searchFilter,
        setSearchFilter,
        searchRecipe,
    } = useContext(FilterContext);

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]));
    };

    const handleApply = () => {
        if (selectedTypes.length > 0 || selectedRatings.length > 0 || timeRange[0] != 0 || timeRange[1] != 0) {
            let filterRecipe = [...searchRecipe];

            if (selectedTypes.length > 0 && selectedRatings.length > 0 && (timeRange[0] != 0 || timeRange[1] != 0)) {
                filterRecipe = filterRecipe.filter(
                    (recipe) =>
                        selectedTypes.includes(recipe.type) &&
                        selectedRatings.includes(recipe.star) &&
                        recipe.time >= timeRange[0] &&
                        recipe.time <= timeRange[1],
                );
                setSearchFilter(filterRecipe);
            } else if (selectedTypes.length > 0 && (timeRange[0] != 0 || timeRange[1] != 0)) {
                filterRecipe = filterRecipe.filter(
                    (recipe) =>
                        selectedTypes.includes(recipe.type) &&
                        recipe.time >= timeRange[0] &&
                        recipe.time <= timeRange[1],
                );
                setSearchFilter(filterRecipe);
            } else if (selectedRatings.length > 0 && (timeRange[0] != 0 || timeRange[1] != 0)) {
                filterRecipe = filterRecipe.filter(
                    (recipe) =>
                        selectedRatings.includes(recipe.star) &&
                        recipe.time >= timeRange[0] &&
                        recipe.time <= timeRange[1],
                );
                setSearchFilter(filterRecipe);
            } else if (selectedRatings.length > 0 && selectedTypes.length > 0) {
                filterRecipe = filterRecipe.filter(
                    (recipe) => selectedRatings.includes(recipe.star) && selectedTypes.includes(recipe.type),
                );
                setSearchFilter(filterRecipe);
            } else if (selectedRatings.length > 0) {
                filterRecipe = filterRecipe.filter((recipe) => selectedRatings.includes(recipe.star));
                setSearchFilter(filterRecipe);
            } else if (timeRange[0] != 0 || timeRange[1] != 0) {
                filterRecipe = filterRecipe.filter(
                    (recipe) => recipe.time >= timeRange[0] && recipe.time <= timeRange[1],
                );
                setSearchFilter(filterRecipe);
            } else if (selectedTypes.length > 0) {
                filterRecipe = filterRecipe.filter((recipe) => selectedTypes.includes(recipe.type));
                setSearchFilter(filterRecipe);
            }
        } else if (selectedTypes.length == 0 && selectedRatings.length == 0 && timeRange[0] == 0 && timeRange[1] == 0) {
            setSearchFilter(searchRecipe);
        }
    };

    return (
        <Container className="mx-0 px-0" style={{ width: '25%' }}>
            <Card className="shadow-sm">
                <Card.Title className="fw-bold mb-3 px-3 pt-3">☰ FILTERS</Card.Title>
                <Accordion className={styles.accordion} alwaysOpen>
                    <Accordion.Item className={styles.accordionItem} eventKey="0">
                        <Accordion.Header className={styles.accordionHeader}>Type</Accordion.Header>
                        <Accordion.Body className={styles.accordionBody}>
                            <Form className="d-flex flex-wrap">
                                {[
                                    'Pan-fried',
                                    'Stir-fried',
                                    'Grilled',
                                    'Roasted',
                                    'Sauteed',
                                    'Baked',
                                    'Steamed',
                                    'Stewed',
                                ].map((type, index) => (
                                    <Form.Check
                                        key={type}
                                        label={type}
                                        id={`checkbox-${index}`}
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                        className={styles.check}
                                        style={
                                            index == 7 || index == 6
                                                ? { marginBottom: '0px' }
                                                : { marginBottom: '16px' }
                                        }
                                    />
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className={styles.accordionItem} eventKey="1">
                        <Accordion.Header className={styles.accordionHeader}>Time</Accordion.Header>
                        <Accordion.Body className={styles.accordionBody}>
                            <p className="text-center mb-0">
                                {timeRange[0]} minutes - {timeRange[1]} minutes
                            </p>
                            <div className="d-flex align-items-center">
                                <Slider
                                    range={{ draggableTrack: true }}
                                    defaultValue={timeRange}
                                    className={styles.customSlider}
                                    onChange={(e) => {
                                        setTimeRange(e);
                                    }}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className={styles.accordionItem} eventKey="2">
                        <Accordion.Header className={styles.accordionHeader}>Rating</Accordion.Header>
                        <Accordion.Body className={styles.accordionBody}>
                            <Form>
                                {[5, 4, 3, 2, 1].map((rating, index) => (
                                    <div
                                        className="d-flex gap-3"
                                        key={index}
                                        style={index == 4 ? {} : { marginBottom: '16px' }}
                                    >
                                        <Form.Check
                                            key={rating}
                                            id={`checkbox-${rating}`}
                                            checked={selectedRatings.includes(rating)}
                                            onChange={() => handleRatingChange(rating)}
                                            className={styles.check}
                                            style={{ width: '16px' }}
                                        />
                                        <div className="d-flex gap-3">
                                            {[...Array(5)].map((_, count) => (
                                                <FaStar
                                                    key={count}
                                                    style={{
                                                        color: count < rating ? '#ffd700' : '#d3d3d3',
                                                        fontSize: '24px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Button onClick={handleApply} className={styles.btn}>
                    Apply
                </Button>
            </Card>
        </Container>
    );
};

export default Filter;
