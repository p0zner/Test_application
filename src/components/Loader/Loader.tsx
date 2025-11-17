import classes from './loader.module.scss'

interface ILoaderProps {
    loaderInButton?: boolean;
    size?: number;
    thickness?: number;
}

const Loader = ({loaderInButton = false, size = 60, thickness = 7}: ILoaderProps) => {
    const loaderStyles = {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${thickness}px`,
    }

    return (
        loaderInButton ?
            <div style={loaderStyles} className={classes.loaderInButton}/> :
            <div className={classes.loader}/>
    )
}

export default Loader;