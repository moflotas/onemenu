import React from "react";
import styles from "./Popup.module.scss"
import foodPicture from '../../../pictures/foodLarge.png'

const Popup = (props) => {
    return (
        <div className={styles.popup}>
            <div className={styles.content}>
                <div className={styles.inside}>
                    <div className={styles.picture}>
                        <img className={styles.image} src={foodPicture} alt="" />
                    </div>
                    <div className={styles.title_block}>
                        <span className={styles.title}> {props.popupItem.name} </span>
                        <span className={styles.weight}> {props.popupItem.weight}g </span>
                        <span className={styles.description}> Here is the description of the product. Here is the description of the dish, and it states that this salad is not tasty. And it is definitely true. </span>
                    </div>
                    <div className={styles.base_ingredients}>
                        <span className={styles.base_title}>Base ingredients</span>
                        {props.popupItem.ingredients.map((ingredient) => (
                            <span className={styles.ingredient}>{ingredient.name}</span>
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.footer_price}>
                            {props.popupItem.price} rub
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;