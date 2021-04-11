import React, { Component, Fragment } from 'react';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState((prevState, props) => {
            return ({
                showSideDrawer: false,
            })
        })
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState, props) => {
            return ({
                showSideDrawer: true,
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    opened={this.sideDrawerOpenHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;