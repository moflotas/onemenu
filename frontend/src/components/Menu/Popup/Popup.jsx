import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import cn from "classnames";
import { close } from "../../../pictures/svg";
import axios from "axios";
import { ORDER } from "../../../api";
import { getQuantity, updateItem } from "../../../updateItem";

const Popup = ({ popupItem, togglePopup, tg }) => {
	let [order, setOrder] = useState(undefined);
	let [number, setNumber] = useState('Wait');

	// function updateItem(isAdd, item) {
	// 	axios
	// 		.get(ORDER + "/active/" + tg.tg.initDataUnsafe.user.id)
	// 		.then((r) => r.data)
	// 		.then((order) => {
	// 			let quantity = getQuantity(popupItem.id, order) + (isAdd ? 1 : -1);
	// 			axios.post(ORDER + "/item", {
	// 				cost: item.cost,
	// 				dish_id: item.id,
	// 				image_url: item.image_url,
	// 				name: item.name,
	// 				order_id: order.id,
	// 				quantity: quantity,
	// 			});

	// 			return quantity
	// 		})
	// 		.then((quantity) => {
	// 			setNumber(quantity);
	// 		})
	// 		.catch((e) => console.log(e));
	// }

	// function getQuantity(id, order) {
	// 	for (let item of order.items) {
	// 		if (item.dish_id === id) {
	// 			return item.quantity;
	// 		}
	// 	}
	// 	return 0;
	// }

	useEffect(() => {
		getOrder().then((order) => {
			setNumber(getQuantity(popupItem.id, order));
		});
	}, []);

	function getOrder() {
		return axios
			.get(ORDER + "/active/" + tg.tg.initDataUnsafe.user.id)
			.then((r) => r.data)
			.then((order) => {
				setOrder(order);
				return order;
			});
	}

	return (
		<div className={styles.popup}>
			<div className={styles.content}>
				<div className={styles.inside}>
					<div className={styles.picture}>
						<button
							className={styles.close_button}
							onClick={togglePopup}
							type="button"
						>
							<svg className={styles.svg} viewBox="0 0 24 24">
								<path d={close} fill="currentColor" />
							</svg>
						</button>
						<img
							className={styles.image}
							src={popupItem && popupItem.image_url}
							alt="Please, wait"
						/>
					</div>
					<div className={styles.ingredient_block}>
						<div className={styles.title_block}>
							<span className={styles.title}>
								{popupItem && popupItem.name}
							</span>
						</div>
						<div className={styles.description}>
							{popupItem && popupItem.description}
						</div>
						{popupItem &&
							popupItem.mandatory_ingredients.length > 0 && (
								<div className={styles.base_ingredients}>
									<span className={styles.base_title}>
										Base ingredients
									</span>
									{popupItem &&
										popupItem.mandatory_ingredients.map(
											(ingredient, index) => (
												<span
													key={index}
													className={
														styles.ingredient
													}
												>
													{ingredient.name}
												</span>
											)
										)}
								</div>
							)}
						{popupItem &&
							popupItem.optional_ingredients.length > 0 && (
								<div
									className={cn(
										styles.base_ingredients,
										styles.add_ingredients
									)}
								>
									<span className={styles.base_title}>
										Additional ingredients
									</span>
									{popupItem &&
										popupItem.optional_ingredients.map(
											(ingredient, index) => (
												<div
													key={index}
													className={
														styles.additional_ingredients
													}
												>
													<span
														className={
															styles.ingredient
														}
													>
														{ingredient.name}
													</span>
													<span
														className={
															styles.i_cost
														}
													>
														{ingredient.cost} rub
													</span>
												</div>
											)
										)}
								</div>
							)}

						{popupItem && popupItem.traits.length > 0 && (
							<div
								className={cn(
									styles.base_ingredients,
									styles.add_ingredients
								)}
							>
								<span className={styles.base_title}>
									Food information
								</span>
								{popupItem &&
									popupItem.traits.map((item) => (
										<div
											key={item.id}
											className={
												styles.additional_ingredients
											}
										>
											<span className={styles.ingredient}>
												{item.name}
											</span>
											<span className={styles.i_cost}>
												{item.value}
											</span>
										</div>
									))}
							</div>
						)}
					</div>

					<div className={styles.footer}>
						<div className={styles.footer_price}>
							{popupItem.cost} rub
						</div>
						<div className={styles.footer_choose}>
							<button
								className={styles.footer_button}
								type="button"
								onClick={() =>
									updateItem(
										false,
										popupItem,
										tg,
										setNumber
									)
								}
							>
								-
							</button>
							<span className={styles.footer_number}>
								{number > -1 ? number : 0}
							</span>
							<button
								className={styles.footer_button}
								type="button"
								onClick={() =>
									updateItem(
										true,
										popupItem,
										tg,
										setNumber
									)
								}
							>
								+
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popup;
