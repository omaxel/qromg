import React from 'react';
import { classNames } from '../../utils';
import classes from './Button.module.scss';

export default ({ className, children, ...rest }) => (
    <button className={classNames(classes.root, className)} {...rest}>
        {children}
    </button>
);