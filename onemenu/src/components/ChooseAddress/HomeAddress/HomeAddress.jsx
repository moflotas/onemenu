import React from "react";
import { Link } from "react-router-dom";
import styles from './HomeAddress.module.scss'

const HomeAddress = () => {
    return (
        <div>
            <div>
                Choose your address
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

export default HomeAddress;