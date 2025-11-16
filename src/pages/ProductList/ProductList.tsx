import ProductCard from "./ProductCard/ProductCard.tsx"; // Можно использовать общие стили

import classes from './productList.module.scss';
import Loader from "../../components/Loader/Loader.tsx";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import {toast} from "react-toastify";
import {useCallback} from "react";
import {deleteProduct} from "../../store/thunks/productsThunk.ts";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const {items: products, status, error} = useAppSelector(state => state.products);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap();
            toast.success("Товар удален");
        } catch (error) {
            toast.error('Не удалось удалить товар')
        }
    }, [dispatch])

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
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default ProductList;