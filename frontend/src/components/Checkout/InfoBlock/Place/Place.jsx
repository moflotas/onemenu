import React from "react";
import styles from './Place.module.scss'
import { home, restaurant } from "../../../../pictures/svg";
import cn from "classnames"

const Place = ({ changeToRestaurant, changeToHome, isHome }) => {
    return (
        <div className={styles.info_place}>
            <button onClick={changeToRestaurant} className={styles.info_place_button}>
                <svg className={cn(styles.image, {[styles.colorful] : !isHome})} viewBox="0 0 120 120">
                    <path d={restaurant} fill="currentColor"/>
                </svg>
                <span className={cn(styles.info_place_label, {[styles.colorful] : !isHome})}>In restaurant</span>
            </button>
            <button onClick={changeToHome} className={styles.info_place_button}>
                <svg className={cn(styles.image, {[styles.colorful] : isHome})} viewBox="0 0 120 120">
                    <path d={home} fill="currentColor"/>
                    <rect x="15" y="108" width="90" height="12" fill="currentColor"/>
                </svg>
                <span className={cn(styles.info_place_label, {[styles.colorful] : isHome})}>At home</span>
            </button>
        </div>
    )
}

export default Place;