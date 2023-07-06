import React from "react";
import styles from "./Cards.module.scss"
import Card from "./Card/Card";
import TextCard from "./Card/textCard";
import cn from "classnames"

const Cards = ({data, hasImage, togglePopup}) => {
    return (
        <div>
            {data.map((category) => (
                <div className={cn(styles.category, {[styles.mb] : !hasImage})}>
                    <span id={category.category_id} className={styles.category_title}>{category.category}</span>
                    <div className={styles.cards}>
                        {category.items.map((item) => (
                            hasImage ? 
                            ( <button onClick={() => togglePopup(item)} className={styles.buttonCard}>
                                <Card name={item.name} price={item.price}/>
                            </button> )
                            :
                            (<TextCard item={item} togglePopup={togglePopup} /> )
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards;