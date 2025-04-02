import { Children, createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [timeRange, setTimeRange] = useState([0, 0]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [searchFilter, setSearchFilter] = useState([]);
    const [searchRecipe, setSearchRecipe] = useState([]);

    const value = {
        selectedTypes,
        setSelectedTypes,
        timeRange,
        setTimeRange,
        selectedRatings,
        setSelectedRatings,
        searchFilter,
        setSearchFilter,
        searchRecipe,
        setSearchRecipe,
    };
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
