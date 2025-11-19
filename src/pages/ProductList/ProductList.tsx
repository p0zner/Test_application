import ProductCard from "./ProductCard/ProductCard.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import {useAppSelector} from "@/store/hooks/useAppSelector.ts";

import classes from './productList.module.scss';


const ProductList = () => {
    const {items: products, status, error} = useAppSelector(state => state.products);

    if (status === 'loading') {
        return <Loader />;
    }
    if (status === 'failed') {
        return <p className={classes.error}>{error}</p>;
    }
    if (status === 'succeeded' && products.length === 0) {
        return <p className={classes.info}>Товаров пока нет. Добавьте первый!</p>
    }

    return (
        <div className={classes.productList}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductList;