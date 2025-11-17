import type {Product} from "../../../types/product.ts";
import classes from './productCard.module.scss'
import {Link} from 'react-router-dom';
import {memo} from "react";
import {convertPrice} from "../../../utils/price.utils.ts";
import RemoveProduct from "../../../components/RemoveProduct/RemoveProduct.tsx";

interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(({product}: ProductCardProps) => (
        <div className={classes.productCard}>
            <div className={classes.deleteButtonTopRight}>
                <RemoveProduct product={product} displayMode='overlay' />
            </div>
            <img src={product.image} alt={product.title}/>
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
)


export default ProductCard;