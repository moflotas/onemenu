import React from "react";
import styles from "../PlaceInfo.module.scss";
import { reload } from "../../../../../pictures/svg";
import cn from "classnames";

const Table = ({ data, isOpenTable, OpenTable }) => {
	return (
		<div>
			<div className={styles.info_block}>
				<div>
					<span className={styles.info_title}>Table: </span>
					<span className={styles.info_data}>{data.table}</span>
				</div>
				<svg
					onClick={OpenTable}
					className={cn(styles.info_image, {
						[styles.rotated]: isOpenTable,
					})}
					viewBox="0 0 24 24"
				>
					<path d={reload} fill="currentColor" />
				</svg>
			</div>
			{isOpenTable && (
				<div className={styles.checkboxes}>
					<div className={styles.inputs}>
						<input
							className={styles.input}
							type="text"
							placeholder="Enter your table"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Table;
