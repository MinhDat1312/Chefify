import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './main.module.scss';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChefifyProvider } from './ChefifyContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ChefifyProvider>
                <App />
            </ChefifyProvider>
        </BrowserRouter>
    </StrictMode>,
);
