import {useParams} from 'react-router-dom';
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import {convertPrice} from "../../utils/price.utils.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {selectProductById} from "../../store/selectors/selectProductById.ts";

import classes from './productDetails.module.scss';
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import ActionBar from "../../components/ActionBar/ActionBar.tsx";
import ProductImage from "./ProductImage/ProductImage.tsx";

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
            <ActionBar product={product}/>
            {product && (
                <div className={classes.contentGrid}>
                    <ProductImage product={product}/>
                    <div className={classes.infoContainer}>
                        <h1 className={classes.title}>{product.title}</h1>
                        <p className={classes.description}>{product.description}</p>
                        <div className={classes.price}>{convertPrice(product.price)} ₽</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;