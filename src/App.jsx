import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './layouts/components/Header/Header';
import Footer from './layouts/components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RecipeBox from './pages/RecipeBox/RecipeBox';
import CookingGuide from './pages/CookingGuide/CookingGuide';
import { useEffect } from 'react';
import Search from './pages/Search/Search';
import { FilterProvider } from './context/FilterContext';

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
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recipe_box" element={<RecipeBox />} />
                    <Route path="/cooking_guide/:id" element={<CookingGuide />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </FilterProvider>
            <Footer />
        </div>
    );
}

export default App;
