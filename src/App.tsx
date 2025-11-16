import {lazy, Suspense, useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {Routes, Route} from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList.tsx";
import {useAppDispatch} from "./store/hooks/useAppDispatch.ts";
import Header from "./components/Header/Header.tsx";
import {fetchProducts} from "./store/thunks/productsThunk.ts";
import Loader from "./components/Loader/Loader.tsx";

import classes from './app.module.scss'

const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.tsx'));

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            <Header/>
            <main>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<ProductList/>}/>
                        <Route path="/products/:productId" element={<ProductDetails/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Suspense>
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default App
