import React, { Component, Fragment } from 'react';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        checkoutActive: false,
        orderLoading: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    updatePurchaseState(ingredients) {
        return Object.values(ingredients).reduce((sum, el) => sum + el, 0) !== 0;
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;

        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        const purchasable = this.updatePurchaseState(updatedIngredients);

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice,
                purchasable: purchasable,
            }
        );
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) {
            return;
        }
        const newCount = this.state.ingredients[type] - 1;

        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        const purchasable = this.updatePurchaseState(updatedIngredients);

        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice,
                purchasable: purchasable,
            }
        );
    }

    purchaseHandler = () => {
        this.setState({
            checkoutActive: true,
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({
            checkoutActive: false,
        })
    }

    purchaseContinuedHandler = () => {
        this.setState({
            orderLoading: true,
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Scott Campbell',
                address: {
                    street: 'Street St',
                    zipCode: '19127',
                    country: 'United States',
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    checkoutActive: false,
                    orderLoading: false,
                })
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <Spinner />;

        let burger = <Spinner />
        if (this.state.ingredients !== null) {

            if (this.state.orderLoading) {
                orderSummary = (
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelOrder={this.cancelPurchaseHandler}
                        continueOrder={this.purchaseContinuedHandler}
                        price={this.state.totalPrice}
                        modalOpen={this.state.checkoutActive}
                    />
                );
            }

            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        currentPrice={this.state.totalPrice}
                        disabledInputs={disabledInfo}
                        purchasable={this.state.purchasable}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        checkout={this.purchaseHandler}
                    />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Modal show={this.state.checkoutActive} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);