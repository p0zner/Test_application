import {useParams} from 'react-router-dom';
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {selectProductById} from "../../store/selectors/selectProductById.ts";

import classes from './productDetails.module.scss';
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import ActionBar from "../../components/ActionBar/ActionBar.tsx";
import ProductContent from "./ProductContent/ProductContent.tsx";

const ProductDetailPage = () => {
    const {productId} = useParams<{ productId: string }>();

    const status = useAppSelector(state => state.products.status);

    const product = useAppSelector(state => selectProductById(state, productId || ''))

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'succeeded' && !product) {
        return <NotFoundPage title="Товар не найден"/>
    }

    return (
        <div className={classes.pageContainer}>
            <ActionBar product={product} />
            <ProductContent product={product} />
        </div>
    );
};

export default ProductDetailPage;