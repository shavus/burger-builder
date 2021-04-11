import React, { Component, Fragment } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    bacon: 0.7,
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 5,
        purchasable: false,
        checkoutActive: false,
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
        alert('You continue...');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Modal show={this.state.checkoutActive} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelOrder={this.cancelPurchaseHandler}
                        continueOrder={this.purchaseContinuedHandler}
                        price={this.state.totalPrice}
                        modalOpen={this.state.checkoutActive}
                    />
                </Modal>
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
        )
    }
}

export default BurgerBuilder;