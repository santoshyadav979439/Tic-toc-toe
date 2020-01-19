import React from 'react';
import classes from './Box.module.css'
const Box = (props) => {
    return (
        <div className={classes.Box} onClick ={props.clicked} value={props.value} >
            {props.value}
        </div>
    );
};

export default Box;