import React, { useState } from "react";
import styles from './Checkout.module.scss'
import cn from "classnames";
import InfoBlock from "./InfoBlock/InfoBlock";


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
        setIsOpenAddress(false)
    }

    const changeToHome = () => {
        setIsHome(true)
        setIsOpenAddress(false)
    }

    const [isOpenAddress, setIsOpenAddress] = useState(false)

    const openAddress = () => {
        setIsOpenAddress(!isOpenAddress)
    }

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    
    return (
        <div className={styles.checkout}>
            <div className={styles.title}>
                Checkout
            </div>

            <InfoBlock 
                changeToRestaurant={changeToRestaurant}
                changeToHome={changeToHome}
                isHome={isHome}
                data={data}
                total={total}
                isOpenAddress={isOpenAddress}
                openAddress={openAddress}
                handleOptionChange={handleOptionChange}
                selectedOption={selectedOption}
            />

            <div className={styles.footer_buttons}>
                {!isHome && (
                    <button className={cn(styles.footer_button, styles.left)} type="button">Order</button>
                )}
                <button className={cn(styles.footer_button, styles.right)} type="button">Pay</button>
            </div>
        </div>
    )
}

export default Checkout;