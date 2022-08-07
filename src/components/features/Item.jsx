import classes from './Item.module.css';

const Item = ({image,text}) => {
    return (
        <div className={classes.item}>
            <div className={classes['image-container']}>
                <img src={image} alt={text} className={classes['image']} />
            </div>
            <p className={classes['text']}>{text}</p>
        </div>
    )
}

export default Item
