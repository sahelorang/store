import React from 'react';
import { Link } from 'react-router-dom';
import classes from './BtnLink.module.css'

const BtnLink = ({children,to}) => {
    return (
        <Link className={classes["btn-link"]} to={to}>            
            {children}
        </Link>
    )
}

export default BtnLink
