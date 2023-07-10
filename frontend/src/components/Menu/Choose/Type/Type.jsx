import React from "react";
import styles from './Type.module.scss';
import cn from "classnames";


const Type = ({hasImage, changeTypeToImage, changeTypeToText}) => {
    return (
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
    )
}

export default Type;