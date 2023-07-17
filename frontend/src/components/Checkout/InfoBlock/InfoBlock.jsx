import React from "react";
import styles from "./InfoBlock.module.scss";
import Dishes from "./Dishes/Dishes";
import Place from "./Place/Place";
import PlaceInfo from "./PlaceInfo/PlaceInfo";

const InfoBlock = ({
	changeToRestaurant,
	changeToHome,
	isHome,
	data,
	total,
	isOpenAddress,
	openAddress,
	handleOptionChange,
	selectedOption,
	OpenTable,
	isOpenTable,
}) => {
	return (
		<div className={styles.checkout_info}>
			<Place
				changeToRestaurant={changeToRestaurant}
				changeToHome={changeToHome}
				isHome={isHome}
			/>

			<PlaceInfo
				isHome={isHome}
				data={data}
				isOpenAddress={isOpenAddress}
				openAddress={openAddress}
				handleOptionChange={handleOptionChange}
				selectedOption={selectedOption}
				isOpenTable={isOpenTable}
				OpenTable={OpenTable}
			/>

			<Dishes data={data} isHome={isHome} total={total} />
		</div>
	);
};

export default InfoBlock;
