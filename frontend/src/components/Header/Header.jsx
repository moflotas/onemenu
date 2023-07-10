import React from "react";
import styles from "./Header.module.scss"
import { Link, useLocation } from "react-router-dom";
import { menu, shoppingCart } from "../../pictures/svg";
import cn from "classnames"

const Header = () => {

    const location = useLocation();
    let isMenu = false;
    let isShoppingCart = false;
    if (location.pathname.includes("menu")) {
        isMenu = true
    } else if (location.pathname.includes("shopping-cart")) {
        isShoppingCart = true
    }


    return (
        <div className={styles.header}>
            <div className={styles.links}>
                <Link className={styles.links_button} to="/menu">
                    <svg className={cn(styles.links_image, {[styles.chosen] : isMenu})} viewBox="0 0 24 24">
                        <path d={menu} fill="currentColor"/>
                    </svg>
                    <span className={cn(styles.links_span, {[styles.chosen] : isMenu})}>Menu</span>
                </Link>
                <Link className={styles.links_button} to="/shopping-cart">
                    <svg className={cn(styles.links_image, {[styles.chosen] : isShoppingCart})}  viewBox="0 0 24 24">
                        <path d={shoppingCart} fill="currentColor"/>
                    </svg>
                    <span className={cn(styles.links_span, {[styles.chosen] : isShoppingCart})}>Shopping Cart</span>
                </Link>
            </div>
        </div>
    )
}

export default Header;