import { Route, Routes } from 'react-router-dom';
import Header from './layouts/components/Header/Header';
import Footer from './layouts/components/Footer/Footer';
import Home from './pages/Home/Home';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="" />
                <Route path="" />
                <Route path="" />
                <Route path="" />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
