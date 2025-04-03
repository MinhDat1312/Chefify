import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './layouts/components/Header/Header';
import Footer from './layouts/components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RecipeBox from './pages/RecipeBox/RecipeBox';
import CookingGuide from './pages/CookingGuide/CookingGuide';
import { useEffect } from 'react';
import { FilterProvider } from './context/FilterContext';
import Recipe from './pages/Recipe/Recipe';
import Subscribe from './pages/Subscribe/Subscribe';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <div>
            <Header />
            <ScrollToTop />
            <FilterProvider>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recipe_box" element={<RecipeBox />} />
                    <Route path="/recipes/:id" element={<CookingGuide />} />
                    <Route path="/recipes" element={<Recipe />} />
                    <Route path="/recipes/subscribe" element={<Subscribe />} />
                </Routes>
            </FilterProvider>
            <Footer />
        </div>
    );
}

export default App;
