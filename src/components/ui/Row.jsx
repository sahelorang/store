import classes from './Row.module.css';

const Row = ({children}) => {
    return (
        <div className={classes.row}>
            {children}
        </div>
    )
}

export default Row
