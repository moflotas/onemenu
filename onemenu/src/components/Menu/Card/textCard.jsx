import React from "react";
import styles from "./Card.module.scss"


const TextCard = (props) => {
    return (
        <div className={styles.textCard}>
            <div className={styles.textCard_title}>
                <span>{props.name}</span>
            </div>
            <div className={styles.textCard_content}>
                <span>({props.price} rub)</span>
                <button>go</button>
            </div>
        </div>
    )
}


export default TextCard;