import React from 'react';
import classes from './Header.module.scss';

export default () => (
    <header className={classes.root}>
        <h1 className={classes.title}>QROMG</h1>
        <p>Type a text in the box below and click the "Generate!" button. The QR Code will appear below it.</p>
    </header>
);