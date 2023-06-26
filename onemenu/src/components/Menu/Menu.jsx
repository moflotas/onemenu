import React from "react";
import styles from './Menu.module.scss'
import Card from "./Card/Card";



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
    
    return (
        <div >
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

            {data.map((category) => (
                <div className={styles.category}>
                    <span id={category.category_id} className={styles.category_title}>{category.category}</span>
                    <div className={styles.cards}>
                        {category.items.map((item) => (
                            <Card name={item.name} price={item.price} />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Menu;