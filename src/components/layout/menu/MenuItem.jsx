import React from 'react'
import classes from './menu-item.module.css';
import { Link ,useRouteMatch} from 'react-router-dom';
import { useProductContext } from '../../../context/productContext';

const MenuItem = ({children,name}) => {
    const {loadProductsByCategory}=useProductContext();
    const {url}=useRouteMatch()
    return (
        <div className={classes.item}>
            <Link to={`${url}/categories/${name}`} onClick={()=>{
                loadProductsByCategory(name);
            }}>{children}</Link>
        </div>
    )
}


export default MenuItem
