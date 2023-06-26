import React from "react";
import styles from "./Header.module.scss"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.links}>
                <Link to="/menu">
                    <button>Menu</button>
                </Link>
                <Link to="/shopping-cart">
                    <button>Shopping Cart</button>
                </Link>
            </div>
        </div>
    )
}

export default Header;