import IconButton from "../IconButton/IconButton.tsx";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import type {Product} from "../../types/product.ts";
import RemoveProduct from "../RemoveProduct/RemoveProduct.tsx";

import classes from './actionBar.module.scss';
import EditProduct from "../EditProduct/EditProduct.tsx";

interface ActionBarProps {
    product?: Product;
}

const ActionBar = ({product}: ActionBarProps) => {
    const navigate = useNavigate();

    return (
        <div className={classes.actionBar}>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowLeft size={24}/>
            </IconButton>
            <div className={classes.deleteOrEditButtons}>
                <EditProduct product={product}/>
                <RemoveProduct product={product} onSuccess={() => navigate('/')} iconSize={24}/>
            </div>
        </div>

    )
}

export default ActionBar;