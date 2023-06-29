import React from "react";
import { Link } from "react-router-dom";
import styles from './ChoosePlace.module.scss'

const ChoosePlace = () => {
    return (
        <div className={styles.block}>
            <div className={styles.choose}>
                <div className={styles.left}>
                    <Link className={styles.link} to="/choose-address-restaurant"> 
                        <svg className={styles.image} width="120" height="120" viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.957 108.154L34.8145 79.3848L47.7539 78.8672C53.2812 79.6289 58.877 82.3926 64.502 85.625L74.5508 85.2246C79.1113 85.3223 81.6797 89.834 77.373 93.0371C73.9551 95.7617 69.2969 95.8008 64.5117 95.5566C61.2207 95.5273 61.25 99.9512 64.6777 99.8242C65.8691 99.873 67.1582 99.541 68.2812 99.4922C74.2285 99.248 79.082 97.9199 81.8945 93.0957L83.2617 89.5215L97.9199 81.5137C105.303 78.75 110.273 85.7129 104.98 91.377C94.4629 99.6875 84.2773 107.266 73.125 112.949C65.0781 118.291 56.8164 118.457 48.3789 113.936L35.957 108.154ZM29.043 64.3164H118.789C119.453 64.3164 120 64.873 120 65.5273V70.8105C120 71.4648 119.453 72.0215 118.789 72.0215H29.043C28.3789 72.0215 27.832 71.4746 27.832 70.8105V65.5273C27.832 64.8633 28.3789 64.3164 29.043 64.3164ZM77.4023 13.7891C101.973 15.752 122.666 36.4062 119.609 60.7227H28.2324C25.2148 36.25 45.9863 15.5664 70.7324 13.7598V9.79492H66.8262C66.1426 9.79492 65.5762 9.22852 65.5762 8.54492V4.07227C65.5762 3.38867 66.1328 2.82227 66.8262 2.82227H81.2012C81.8848 2.82227 82.4512 3.38867 82.4512 4.07227V8.54492C82.4512 9.22852 81.8848 9.79492 81.2012 9.79492H77.4023V13.7891ZM0 78.3984L30.8105 76.7773L32.1777 111.201L1.36719 112.812L0 78.3984Z" fill="currentColor"/>
                        </svg>
                        <button className={styles.button_text}>In restaurant</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Link className={styles.link} to="/choose-address-home">
                        <svg className={styles.image} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M120 65.6348L60 19.0095L0 65.6348V46.6363L60 0L120 46.6254V65.6348ZM105 63.9419V109H75V78.9649H45V109H15V63.9474L60 30.1607L105 63.9419Z" fill="currentColor"/>
                            <rect x="15" y="108" width="90" height="12" fill="currentColor"/>
                        </svg>
                        <button className={styles.button_text}>At home</button>
                    </Link>
                </div>

            </div>
            <div className={styles.labelBlock}>
                    <Link to="/menu">
                        <span className={styles.label}> Go to menu</span>
                    </Link>
            </div>
        </div>
    )
}

export default ChoosePlace;