import {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {useAppDispatch} from "./store/hooks/useAppDispatch.ts";
import Header from "./components/Header/Header.tsx";
import {fetchProducts} from "./store/thunks/productsThunk.ts";

import classes from './app.module.scss'
import AppRouter from "./router/AppRouter.tsx";


function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            <Header/>
            <main>
                <AppRouter/>
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
