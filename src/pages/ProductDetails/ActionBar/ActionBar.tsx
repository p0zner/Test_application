import IconButton from "../../../components/IconButton/IconButton.tsx";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import RemoveProduct from "../../../components/RemoveProduct/RemoveProduct.tsx";

import classes from './actionBar.module.scss';
import EditProduct from "../../../components/EditProduct/EditProduct.tsx";
import {useProductDetail} from "@/context/productDetailContext.ts";

const ActionBar = () => {
    const navigate = useNavigate();
    const product = useProductDetail();

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