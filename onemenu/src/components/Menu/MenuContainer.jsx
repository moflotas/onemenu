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
        <div>
            {isOpen && (
                <Popup popupItem={popupItem} />
            )}
        </div>
    )
}

export default Menu;