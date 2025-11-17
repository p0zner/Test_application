import Loader from "../components/Loader/Loader.tsx";
import {Route, Routes} from "react-router-dom";
import ProductList from "../pages/ProductList/ProductList.tsx";
import {lazy, Suspense} from "react";

const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails.tsx'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage.tsx'));


const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<ProductList/>}/>
                <Route path="/products/:productId" element={<ProductDetails/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;