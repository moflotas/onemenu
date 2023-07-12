import React from "react";
import styles from "./PlaceInfo.module.scss";
import { reload } from "../../../../pictures/svg";
import Address from "./Address/Address";
import Restaurant from "./Restaurant/Restaurant";
import Table from "./Table/Table";

const PlaceInfo = ({
	isHome,
	data,
	isOpenAddress,
	openAddress,
	handleOptionChange,
	selectedOption,
	isOpenTable,
	OpenTable,
}) => {

	// const [isOpenTable, setIsOpenTable] = React.useState();
	// const OpenTable = () => {
	// 	setIsOpenTable(!isOpenTable);
	// };


	return (
		<div>
			{isHome ? (
				<Address
					openAddress={openAddress}
					isOpenAddress={isOpenAddress}
					data={data}
					handleOptionChange={handleOptionChange}
					selectedOption={selectedOption}
				/>
			) : (
				<div>
					<Restaurant data={data} />
					<Table
						data={data}
						isOpenTable={isOpenTable}
						OpenTable={OpenTable}
					/>
				</div>
			)}
			<div className={styles.info_block}>
				<div>
					<span className={styles.info_title}>Payment: </span>
					<span className={styles.info_data}>{data.payment}</span>
				</div>
				<svg className={styles.info_image} viewBox="0 0 24 24">
					<path d={reload} fill="currentColor" />
				</svg>
			</div>
		</div>
	);
};

export default PlaceInfo;
