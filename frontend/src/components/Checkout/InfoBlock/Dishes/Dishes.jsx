import React from "react";
import styles from "./Dishes.module.scss";
import cn from "classnames";

const Dishes = ({ data, isHome, total }) => {
    return (
        <div className={styles.info_dishes}>
            {data.food.map((dish, index) => (
                <div className={styles.info_block_line} key={index}>
                    <div>
                        <span className={styles.info_dish}>{dish.name}</span>
                        <span className={styles.info_amount}>x{dish.amount}</span>
                    </div>
                    <span className={styles.info_dish}>{dish.price} rub</span>
                </div>
            ))}
            {isHome && (
                <div className={styles.info_block_line} key="delivery">
                    <span className={styles.info_dish}>Delivery</span>
                    <span className={styles.info_dish}>{data.delivery} rub</span>
                </div>
            )}
            <div className={styles.info_block_line} key="total">
                <span className={cn(styles.info_dish, styles.bold)}>Total</span>
                <span className={cn(styles.info_dish, styles.bold)}>{total} rub</span>
            </div>
        </div>
    );
};

export default Dishes;
