import React, { useState } from "react";
import styles from './Menu.module.scss'
import Card from "./Card/Card";
import TextCard from "./Card/textCard";



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
            <div className={styles.type}>
                <button onClick={changeTypeToImage} type="button">With Images</button>
                <button onClick={changeTypeToText} type="button">Text</button>
            </div>
            
            <div className={styles.choosing}>
            {data.map((category) => (
                <a className={styles.choosing_link} href={`#${category.category_id}`}>
                    {category.category}
                </a>
            ))}
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