import { Route, Routes } from 'react-router-dom';
import Header from './layouts/components/Header/Header';
import Footer from './layouts/components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="" />
                <Route path="" />
                <Route path="" />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
