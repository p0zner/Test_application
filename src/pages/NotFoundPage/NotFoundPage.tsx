import {useNavigate} from "react-router-dom";
import classes from './notFoundPage.module.scss'

interface NotFoundPageProps {
    title?: string;
}

const NotFoundPage = ({title = 'Страница не найдена'}: NotFoundPageProps) => {
    const navigate = useNavigate();
    return (
        <div className={classes.notFound}>
            <h2>{title}</h2>
            <button onClick={() => navigate('/')} className={classes.button}>
                Вернуться на главную
            </button>
        </div>
    )
}

export default NotFoundPage;