import React from "react";
import styles from './Menu.module.scss'
import cn from "classnames"
import Popup from "./Popup/Popup";
import MenuContainer from "./MenuContainer";
import Category from "./Choose/Category/Category";
import Cards from "./Cards/Cards";
import Type from "./Choose/Type/Type";




const Menu = () => {

    const {
        isOpen,
        popupItem,
        hasImage,
        isFixed,
        selectedCategory,
        togglePopup,
        menuRef,
        changeTypeToText,
        changeTypeToImage,
        selectCategory,
      } = MenuContainer();

    let data = [
        {category: "Fried fish", items: [
            {id: 1, name: "tasty food", price: 255, weight: 320, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"},
                {name: "food"}, {name: "aaaa"}, {name: "cibo"}
            ]},
            {id: 2, name: "Something different", price: 567, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 3, name: "Culture", price: 12, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 4, name: "Lunch", price: 450, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 5, name: "fruit", price: 216, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 6, name: "aaaa", price: 215, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]}
        ], category_id: 1},
        {category: "Fried potato", items: [
            {id: 7, name: "tasty food", price: 255, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 8, name: "Something different", price: 567, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 9, name: "Culture", price: 12, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 10, name: "Lunch", price: 450, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 11, name: "fruit", price: 216, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 12, name: "aaaa", price: 215, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]}
        ], category_id: 2},
        {category: "Life is lose", items: [
            {id: 7, name: "tasty food", price: 255, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 8, name: "Something different", price: 567, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 9, name: "Culture", price: 12, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 10, name: "Lunch", price: 450, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 11, name: "fruit", price: 216, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 12, name: "aaaa", price: 215, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]}
        ], category_id: 3},
        {category: "Tasty dish", items: [
            {id: 7, name: "tasty food", price: 255, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 8, name: "Something different", price: 567, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 9, name: "Culture", price: 12, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 10, name: "Lunch", price: 450, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 11, name: "fruit", price: 216, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]},
            {id: 12, name: "aaaa", price: 215, weight: 250, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
            ]}
        ], category_id: 4}
    ]


    return (
        <div className={styles.menu}>
            <div className={styles.title}>
                Menu
            </div>

            <Type 
                hasImage={hasImage}
                changeTypeToImage={changeTypeToImage}
                changeTypeToText={changeTypeToText}
            />
            
            <div
                className={cn(styles.sm, {[styles.fixedContainer]: isFixed})} 
                id="choosing" 
                ref={menuRef}
            >
                <Category 
                    data={data} 
                    selectCategory={selectCategory} 
                    selectedCategory={selectedCategory} 
                />
            </div>

            {isOpen && (
                <Popup 
                    popupItem={popupItem} 
                    togglePopup={togglePopup}
                />
            )}

            <Cards 
                data={data} 
                togglePopup={togglePopup} 
                hasImage={hasImage} 
            />
        </div>
    )
}

export default Menu;