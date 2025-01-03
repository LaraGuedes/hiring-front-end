import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../main/index.tsx';
import Header from '../headerNavegate/index.tsx';
import ShoppingCart from '../shoppingCart/index.tsx';
import Footer from '../footer/index.tsx';
import HomePage from '../home/index.tsx';


const Router: React.FC = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/main" element={
                    <>
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path="/carrinho" element={<ShoppingCart />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
