import React, { Component, Fragment } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

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
    }

    updatePurchaseState(ingredients)
    {
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

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    currentPrice={this.state.totalPrice}
                    disabledInputs={disabledInfo}
                    purchasable={this.state.purchasable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder;