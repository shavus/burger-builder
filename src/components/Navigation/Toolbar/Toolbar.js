import React from 'react';

import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu opened={props.opened} />
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;