import { Route, Routes } from 'react-router-dom';
import Header from './layouts/components/Header/Header';
import Footer from './layouts/components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RecipeBox from './pages/RecipeBox/RecipeBox';
import CookingGuide from './pages/CookingGuide/CookingGuide';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe_box" element={<RecipeBox />} />
                <Route path="/cooking_guide" element={<CookingGuide />} />
                <Route path="" />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
