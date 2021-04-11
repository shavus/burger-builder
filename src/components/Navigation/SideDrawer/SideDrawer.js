import React, { Fragment } from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    const sideDrawerClasses = [classes.SideDrawer];
    if (props.open)
    {
        sideDrawerClasses.push(classes.Open);
    } else {
        sideDrawerClasses.push(classes.Close);
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={sideDrawerClasses.join(' ')}>
                <Logo height='11%' />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;