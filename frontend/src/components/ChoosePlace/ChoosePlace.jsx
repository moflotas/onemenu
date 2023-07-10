import React from "react";
import { Link } from "react-router-dom";
import styles from './ChoosePlace.module.scss'
import { restaurant, home, arrowForward } from "../../pictures/svg.jsx"

const ChoosePlace = () => {
    return (
        <div className={styles.block}>
            <div className={styles.choose}>
                <div className={styles.left}>
                    <Link className={styles.link} to="/choose-address-restaurant"> 
                        <svg className={styles.image} viewBox="0 0 120 120">
                            <path d={restaurant} fill="currentColor"/>
                        </svg>
                        <button className={styles.button_text}>In restaurant</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Link className={styles.link} to="/choose-address-home">
                        <svg className={styles.image} viewBox="0 0 120 120">
                            <path d={home} fill="currentColor"/>
                            <rect x="15" y="108" width="90" height="12" fill="currentColor"/>
                        </svg>
                        <button className={styles.button_text}>At home</button>
                    </Link>
                </div>

            </div>
            <div className={styles.labelBlock}>
                    <Link className={styles.label_link} to="/menu">
                        <span className={styles.label}> Go to menu</span>
                        <svg className={styles.label_image} viewBox="0 0 24 24" >
                            <path d={arrowForward} fill="currentColor"/>
                        </svg>
                    </Link>
            </div>
        </div>
    )
}

export default ChoosePlace;