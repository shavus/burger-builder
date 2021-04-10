import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {

    let burgerIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
            return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (burgerIngredients.length === 0)
    {
        burgerIngredients = <p>Add some ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;