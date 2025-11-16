import {useNavigate} from "react-router-dom";
import classes from './notFoundPage.module.scss'

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.notFound}>
            <h2>Товар не найден</h2>
            <button onClick={() => navigate('/')} className={classes.button}>
                Вернуться на главную
            </button>
        </div>
    )
}

export default NotFoundPage;