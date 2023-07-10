import React from "react";
import styles from './InfoBlock.module.scss';
import { home, reload, restaurant } from "../../../pictures/svg";
import Dishes from "./Dishes/Dishes";
import Place from "./Place/Place";
import PlaceInfo from "./PlaceInfo/PlaceInfo";

const InfoBlock = ({ changeToRestaurant, changeToHome, isHome, data, total }) => {
    return (
        <div className={styles.checkout_info}>
            <Place 
                changeToRestaurant={changeToRestaurant} 
                changeToHome={changeToHome}
                isHome={isHome}
            />

            <PlaceInfo isHome={isHome} data={data} />

            <Dishes data={data} isHome={isHome} total={total} />
        </div>
    )
}

export default InfoBlock;