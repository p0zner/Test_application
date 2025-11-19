import {Link} from "react-router-dom";
import classes from './header.module.scss'
import AddProductButton from "@/components/Header/AddProductButton/AddProductButton.tsx";

const Header = () => {


    return (
    <header className={classes.appHeader}>
        <Link to={`/`}>
            <h1 className={classes.appTitle}>Ягодки :)</h1>
        </Link>
        <AddProductButton />
    </header>
    )
}

export default Header;