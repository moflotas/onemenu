import React from "react";
import styles from './Card.module.scss'

const Card = (props) => {
    return (
        <div className={styles.card}>
            <img className={styles.card_image} src={props.image_url} alt="please, wait" />
            <div className={styles.card_description}>
                <span className={styles.card_title}>{props.name}</span>
                <span className={styles.card_price}>{props.price} rub</span>
            </div>
        </div>
    )
}

export default Card;