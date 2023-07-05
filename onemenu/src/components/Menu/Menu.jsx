import React, { useState } from "react";
import styles from './Menu.module.scss'
import Card from "./Card/Card";
import TextCard from "./Card/textCard";
import cn from "classnames"
import Popup from "./Popup/Popup";




const Menu = () => {

    let data = [
        {category: "Fried fish", items: [
            {id: 1, name: "tasty food", price: 255, weight: 320, ingredients: [
                {name: "carrot"}, {name: "potato"}, {name: "something"}
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

    const [isOpen, setIsOpen] = useState(false)
    const [popupItem, setPopupItem] = useState()
    const [hasImage, setHasImage] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [originalPosition, setOriginalPosition] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    

    const togglePopup = (item) => {
        setIsOpen(!isOpen)
        setPopupItem(item)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }

    const menuRef = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
          const choosingElement = document.getElementById("choosing");
          if (choosingElement) {
            if (originalPosition === 0) {
              setOriginalPosition(choosingElement.offsetTop);
            }
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const isTopReached = scrollPosition >= originalPosition;
            setIsFixed(isTopReached); 
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [originalPosition]);


    const changeTypeToText = () => {
        setHasImage(false);
      };
    
    const changeTypeToImage = () => {
        setHasImage(true);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setTimeout(() => {
          const categoryElement = document.getElementById(category);
          if (categoryElement) {
            const { top } = categoryElement.getBoundingClientRect();
            window.scrollTo({
              top: window.pageYOffset + top - menuRef.current.offsetHeight - 10,
              behavior: "smooth",
            });
          }
        }, 10);
      };


    return (
        <div className={styles.menu}>
            <div className={styles.title}>
                Menu
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
            
            <div
            className={cn(styles.sm, {[styles.fixedContainer]: isFixed})} 
            id="choosing" 
            ref={menuRef}>
                <div className={styles.choosing}>
                    {data.map((category) => (
                        <a
                            className={cn(styles.choosing_link, {
                            [styles.choosing_link_clicked]: category.category_id === selectedCategory,
                            })}
                            href={`#${category.category_id}`}
                            onClick={() => selectCategory(category.category_id)}
                        >
                            <span className={cn(styles.choosing_span)}>{category.category}</span>
                        </a>
                    ))}
                </div>
            </div>


            {isOpen && (
                <Popup popupItem={popupItem} />
            )}

            {data.map((category) => (
                <div className={styles.category}>
                    <span id={category.category_id} className={styles.category_title}>{category.category}</span>
                    <div className={styles.cards}>
                        {category.items.map((item) => (
                            hasImage ? 
                            ( <button onClick={() => togglePopup(item)} className={styles.buttonCard}>
                                <Card name={item.name} price={item.price}/>
                            </button> )
                            :
                            (<TextCard name={item.name} price={item.price} /> )
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menu;