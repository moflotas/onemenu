import React from "react";
import { Link } from "react-router-dom";
import styles from "./ShoppingCart.module.scss"
import foodPicture from '../../pictures/foodPicture.png'

const ShoppingCart = () => {
    
    let data = [
        {name: "Fried fish", price: 154, amount: 2, picture: foodPicture},
        {name: "Shashlyk", price: 2000, amount: 1, picture: foodPicture},
        {name: "King of the food", price: 123, amount: 3, picture: foodPicture},
        {name: "Chicken meat", price: 243, amount: 5, picture: foodPicture},
        {name: "Water drink with ice", price: 2050, amount: 6, picture: foodPicture},
    ]

    const totalPrice = data.reduce((sum, item) => sum + item.price * item.amount, 0)

    return (
        <div className={styles.cart}>
            <div className={styles.title}>
                Your order
            </div>
            <div className={styles.dishes}>
                {data.map((food) => (
                    <div className={styles.order}>
                        <div className={styles.order_description}>
                            <img className={styles.order_image} src={food.picture} alt="" />
                            <div className={styles.order_text}>
                                <span>{food.name}</span>
                                <span className={styles.order_price}>{food.price}</span>
                            </div>
                        </div>
                        <div className={styles.order_number}>
                            <button className={styles.order_button}>-</button>
                            <span className={styles.order_number}>{food.amount}</span>
                            <button className={styles.order_button}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.order_total}>
                <span>Total sum: {totalPrice} rub</span>
            </div>
            <div className={styles.button}>
                <Link to="/shopping-cart/checkout">
                    <button className={styles.button_order}>Order</button>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingCart;