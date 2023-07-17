import React from "react";
import styles from '../PlaceInfo.module.scss'
import { reload } from "../../../../../pictures/svg";

const Restaurant = ({ data }) => {
    return (
        <div className={styles.info_block}>
            <div>
                <span className={styles.info_title}>Restaurant: </span>
                <span className={styles.info_data}>{data.restaurant}</span>
            </div>
            <svg className={styles.info_image} viewBox="0 0 24 24" >
                <path d={reload} fill="currentColor"/>
            </svg>
        </div>
    )
}

export default Restaurant;