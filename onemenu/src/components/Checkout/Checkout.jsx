import React, { useState } from "react";
import styles from './Checkout.module.scss'
import { restaurant, home } from "../../pictures/svg";
import cn from "classnames";


const Checkout = () => {
    let data = {
        address: "54, Volga street, Innocity",
        payment: "Mastercard ****4575",
        food: [
            {name: "Tasty Shaslyk", price: 2024, amount: 2},
            {name: "Something on the way", price: 201, amount: 20},
            {name: "Not tasty salad", price: 123, amount: 4},
            {name: "Already late dish", price: 1000, amount: 1},
        ],
        delivery: 200,
        restaurant: "Small Boss",
        table: 10
    }

    let total = data.food.reduce((sum, item) => sum + item.price * item.amount, 0) + data.delivery;

    const [isHome, setIsHome] = useState(true)

    const changeToRestaurant = () => {
        setIsHome(false)
    }

    const changeToHome = () => {
        setIsHome(true)
    }
    
    return (
        <div className={styles.checkout}>
            <div className={styles.title}>
                Checkout
            </div>
            <div className={styles.checkout_info}>
                <div className={styles.info_place}>
                    <button onClick={changeToRestaurant} className={styles.info_place_button}>
                        <svg className={cn(styles.image, {[styles.colorful] : !isHome})} viewBox="0 0 120 120">
                            <path d={restaurant} fill="currentColor"/>
                        </svg>
                        <span className={cn(styles.info_place_label, {[styles.colorful] : !isHome})}>In restaurant</span>
                    </button>
                    <button onClick={changeToHome} className={styles.info_place_button}>
                        <svg className={cn(styles.image, {[styles.colorful] : isHome})} viewBox="0 0 120 120">
                            <path d={home} fill="currentColor"/>
                            <rect x="15" y="108" width="90" height="12" fill="currentColor"/>
                        </svg>
                        <span className={cn(styles.info_place_label, {[styles.colorful] : isHome})}>At home</span>
                    </button>
                </div>
                {isHome ? (
                    <div className={styles.info_block}>
                        <span className={styles.info_title}>Address: </span>
                        <span className={styles.info_data}>{data.address}</span>
                    </div>
                ) : (
                    <div>
                        <div className={styles.info_block}>
                            <span className={styles.info_title}>Restaurant: </span>
                            <span className={styles.info_data}>{data.restaurant}</span>
                        </div>
                        <div className={styles.info_block}>
                            <span className={styles.info_title}>Table: </span>
                            <span className={styles.info_data}>{data.table}</span>
                        </div>
                    </div>


                )}

                <div className={styles.info_block}>
                    <span className={styles.info_title}>Payment: </span>
                    <span className={styles.info_data}>{data.payment}</span>
                </div>
                <div className={styles.info_dishes}>
                    {data.food.map((dish) => (
                        <div className={styles.info_block_line}>
                            <div>
                                <span className={styles.info_dish}>{dish.name}</span>
                                <span className={styles.info_amount}>x{dish.amount}</span>
                            </div>
                            <span className={styles.info_dish}>{dish.price} rub</span>
                        </div>
                    ))}
                    {isHome && (
                    <div className={styles.info_block_line}>
                        <span className={styles.info_dish}>Delivery</span>
                        <span className={styles.info_dish}>{data.delivery} rub</span>
                    </div>
                    )}
                    <div className={styles.info_block_line}>
                        <span className={cn(styles.info_dish, styles.bold)}>Total</span>
                        <span className={cn(styles.info_dish, styles.bold)}>{total} rub</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;