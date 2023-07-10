import React from "react";
import { Link } from "react-router-dom";
import styles from './RestaurantAddress.module.scss'

const RestaurantAddress = () => {
    return (
        <div>
            <div>
                Choose your Restaurant
            </div>

            <div className={styles.buttons}>
                <Link to="/choose-place">
                    <button>Back</button>
                </Link>
                <Link to="/menu">
                    <button>Next</button>
                </Link>
            </div>
        </div>
    )
}

export default RestaurantAddress;