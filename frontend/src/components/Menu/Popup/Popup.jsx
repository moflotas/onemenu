import React from "react";
import styles from "./Popup.module.scss";
import foodPicture from '../../../pictures/foodLarge.png';
import cn from "classnames";
import { close } from "../../../pictures/svg";

const Popup = ({popupItem, togglePopup}) => {
    return (
        <div className={styles.popup}>
            <div className={styles.content}>
                <div className={styles.inside}>
                    <div className={styles.picture}>
                        <button className={styles.close_button} onClick={togglePopup} type="button">
                            <svg className={styles.svg} viewBox="0 0 24 24">
                                <path d={close} fill="currentColor"/>
                            </svg>
                        </button>
                        <img className={styles.image} src={foodPicture} alt="" />
                    </div>
                    <div className={styles.ingredient_block}>
                        <div className={styles.title_block}>
                            <span className={styles.title}>{popupItem && popupItem.name}</span>
                        </div>
                        <div className={styles.description}>
                            {popupItem && popupItem.description}
                        </div>
                        <div className={styles.base_ingredients}>
                            <span className={styles.base_title}>Base ingredients</span>
                            {popupItem && popupItem.mandatory_ingredients.map((ingredient, index) => (
                                <span key={index} className={styles.ingredient}>{ingredient.name}</span>
                            ))}
                        </div>
                        <div className={cn(styles.base_ingredients, styles.add_ingredients)}>
                            <span className={styles.base_title}>Additional ingredients</span>
                            {popupItem && popupItem.optional_ingredients.map((ingredient, index) => (
                                <div key={index} className={styles.additional_ingredients}>
                                    <span className={styles.ingredient}>{ingredient.name}</span>
                                    <span className={styles.i_cost}>{ingredient.cost} rub</span>
                                </div>                  
                            ))}
                        </div>
                        <div className={cn(styles.base_ingredients, styles.add_ingredients)}>
                            <span className={styles.base_title}>Food information</span>
                            {popupItem && popupItem.traits.map((item) => (
                                <div key={item.id} className={styles.additional_ingredients}>
                                    <span className={styles.ingredient}> {item.name} </span>
                                    <span className={styles.i_cost}> {item.value} </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.footer_price}>
                            {popupItem.cost} rub
                        </div>
                        <div className={styles.footer_choose}>
                            <button className={styles.footer_button} type="button">-</button>
                            <span className={styles.footer_number}>0</span>
                            <button className={styles.footer_button} type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
