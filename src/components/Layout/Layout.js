import React, { Fragment } from 'react';

import classes from './Layout.css'

const layout = (props) => (
    <Fragment>
        <div>Toolbar, Sidedrawer and Backdrop</div>
        <main className={classes.Layout}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;