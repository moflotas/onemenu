import React from "react";
import styles from "./Card.module.scss"
import { arrowForward } from "../../../../pictures/svg";



const TextCard = ({item, togglePopup}) => {
    return (
        <div className={styles.textCard}>
            <div className={styles.textCard_title}>
                <span>{item.name}</span>
            </div>
            <div className={styles.textCard_content}>
                <span>({item.price} rub)</span>
                <button onClick={() => togglePopup(item)}>
                    <svg className={styles.text_card_image} viewBox="0 0 24 24" >
                        <path d={arrowForward} fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}


export default TextCard;