import React from "react";
import styles from './Card.module.scss'

import foodPicture from '../../../pictures/foodPicture.png'

const Card = (props) => {
    return (
        <div className={styles.card}>
            <img className={styles.card_image} src={foodPicture} alt="" />
            <div className={styles.card_description}>
                <span>{props.name}</span>
                <span>{props.price} rub</span>
            </div>
        </div>
    )
}

export default Card;