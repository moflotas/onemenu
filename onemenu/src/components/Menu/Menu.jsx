import React, { useState } from "react";
import styles from './Menu.module.scss'
import Card from "./Card/Card";
import TextCard from "./Card/textCard";
import cn from "classnames"



const Menu = () => {
    let data = [
        {category: "Fried fish", items: [
            {name: "tasty food", price: 255},
            {name: "Something different", price: 567},
            {name: "Culture", price: 12},
            {name: "Lunch", price: 450},
            {name: "fruit", price: 216},
            {name: "aaaa", price: 215}
        ], category_id: 1},
        {category: "Fried potato", items: [
            {name: "tasty food", price: 255},
            {name: "Something different", price: 567},
            {name: "Culture", price: 12},
            {name: "Lunch", price: 450},
            {name: "fruit", price: 216},
            {name: "aaaa", price: 215}
        ], category_id: 2}
    ]

    const [hasImage, setHasImage] = useState(true);

    const changeTypeToText = () => {
        setHasImage(false);
      };
    
      const changeTypeToImage = () => {
        setHasImage(true);
      };
        


    return (
        <div className={styles.menu}>
            <div className={styles.title}>
                Menu
            </div>
            
            <div className={styles.choosing}>
            {data.map((category) => (
                <a className={styles.choosing_link} href={`#${category.category_id}`}>
                    {category.category}
                </a>
            ))}
            </div>

            <div className={styles.type}>
                <button className={cn(styles.button_type, {[styles.active] : hasImage})} onClick={changeTypeToImage} type="button">
                <svg className={styles.type_image} viewBox="0 0 22 22">
                    <rect width="10" height="10" rx="2" fill="currentColor"/>
                    <rect x="12" width="10" height="10" rx="2" fill="currentColor"/>
                    <rect y="12" width="10" height="10" rx="2" fill="currentColor"/>
                    <rect x="12" y="12" width="10" height="10" rx="2" fill="currentColor"/>
                </svg>
                </button>
                <button className={cn(styles.button_type, {[styles.active] : !hasImage})} onClick={changeTypeToText} type="button">
                <svg className={styles.type_image} viewBox="0 0 22 22">
                    <rect width="22" height="4" rx="2" fill="currentColor"/>
                    <rect y="6" width="22" height="4" rx="2" fill="currentColor"/>
                    <rect y="12" width="22" height="4" rx="2" fill="currentColor"/>
                    <rect y="18" width="22" height="4" rx="2" fill="currentColor"/>
                </svg>

                </button>
            </div>

            {data.map((category) => (
                <div className={styles.category}>
                    <span id={category.category_id} className={styles.category_title}>{category.category}</span>
                    <div className={styles.cards}>
                        {category.items.map((item) => (
                            hasImage ? (<Card name={item.name} price={item.price}/>)
                            : (<TextCard name={item.name} price={item.price} />)
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menu;