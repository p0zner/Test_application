import type {Product} from "../../../types/product.ts";
import classes from './productCard.module.scss'
import {Link} from 'react-router-dom';
import DeleteButton from "../../../components/DeleteButton/DeleteButton.tsx";
import {memo, useCallback} from "react";
import {convertPrice} from "../../../utils/price.utils.ts";
import {deleteProduct} from "../../../store/thunks/productsThunk.ts";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch.ts";
import {toast} from "react-toastify";

interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(({product}: ProductCardProps) => {
    const dispatch = useAppDispatch();

    const onDelete = useCallback(async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap();
            toast.success("Товар удален");
        } catch (error) {
            toast.error('Не удалось удалить товар')
        }
    }, [dispatch])

    return (
            <div className={classes.productCard}>
                <div className={classes.deleteButtonTopRight}>
                    <DeleteButton
                        id={product.id}
                        onDelete={onDelete}
                        displayMode="overlay"
                    />
                </div>
                <img src={product.image} alt={product.title} />
                <div className={classes.productContent}>
                    <div className={classes.mainCardInfo}>
                        <div className={classes.title}>{product.title}</div>
                        <div className={classes.price}>{convertPrice(product.price)} ₽</div>
                    </div>
                    <p>{product.description}</p>
                </div>
                <div className={classes.productHandlers}>
                    <Link
                        to={`/products/${product.id}`}
                        className={`${classes.button} ${classes.showInfoButton}`}
                    >
                        Перейти
                    </Link>
                </div>
            </div>
        )
    }
)


export default ProductCard;