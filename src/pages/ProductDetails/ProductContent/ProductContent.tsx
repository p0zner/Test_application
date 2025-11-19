import ProductImage from "../ProductImage/ProductImage.tsx";
import {convertPrice} from "../../../utils/price.utils.ts";

import classes from './productContent.module.scss'
import {useProductDetail} from "../../../context/productDetailContext.ts";

const ProductContent = () => {
    const product = useProductDetail()
    return (
        <div className={classes.contentGrid}>
            <ProductImage product={product}/>
            <div className={classes.infoContainer}>
                <h1 className={classes.title}>{product.title}</h1>
                <p className={classes.description}>{product.description}</p>
                <div className={classes.price}>{convertPrice(product.price)} ₽</div>
            </div>
        </div>
    )
}

export default ProductContent;