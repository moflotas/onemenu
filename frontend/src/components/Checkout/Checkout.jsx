import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import cn from "classnames";
import InfoBlock from "./InfoBlock/InfoBlock";
import CheckoutContainer from "./CheckoutContainer";
import { ORDER } from "../../api";
import axios from "axios";

const Checkout = ({ tg }) => {
	let [data, setData] = useState({
			address: "54, Volga street, Innocity",
			payment: "Mastercard ****4575",
			food: [
				// { name: "Tasty Shaslyk", price: 2024, amount: 2 },
				// { name: "Food", price: 201, amount: 20 },
				// { name: "Not tasty salad", price: 123, amount: 4 },
				// { name: "Late dish", price: 1000, amount: 1 },
			],
			delivery: 200,
			restaurant: "Small Boss",
			table: 10,
		});
	let [total, setTotal] = useState(0);
	// let data = {
	// 	address: "54, Volga street, Innocity",
	// 	payment: "Mastercard ****4575",
	// 	food: [
	// 		{ name: "Tasty Shaslyk", price: 2024, amount: 2 },
	// 		{ name: "Food", price: 201, amount: 20 },
	// 		{ name: "Not tasty salad", price: 123, amount: 4 },
	// 		{ name: "Late dish", price: 1000, amount: 1 },
	// 	],
	// 	delivery: 200,
	// 	restaurant: "Small Boss",
	// 	table: 10,
	// };

	useEffect(() => {
		if (Object.keys(tg.tg.initDataUnsafe).length !== 0) {
			axios
				.get(ORDER + "/active/" + tg.tg.initDataUnsafe.user.id)
				.then((r) => r.data)
				.then((order) => {
					let data = {
						address: "54, Volga street, Innocity",
						payment: "Mastercard ****4575",
						food: order.items,
						delivery: 200,
						restaurant: "Small Boss",
						table: 10,
					};
					setData(data);
					let total =
						order.items.reduce((sum, item) => sum + item.dish.cost * item.quantity, 0) +
						data.delivery;
					setTotal(total);
				})
				.catch((e) => console.log(e));
		}
	}, []);

	// let total =
	// 	data.food.reduce((sum, item) => sum + item.price * item.amount, 0) +
	// 	data.delivery;
	// if (Object.keys(tg.tg.initDataUnsafe).length !== 0) {
	// 	total = cData.reduce((sum, item) => sum + item.cost * item.quantity, 0)
	// }
	


	const {
		isHome,
		isOpenAddress,
		isOpenTable,
		selectedOption,
		changeToRestaurant,
		changeToHome,
		openAddress,
		OpenTable,
		handleOptionChange,
	} = CheckoutContainer();

	return (
		<div className={styles.checkout}>
			<div className={styles.title}>Checkout</div>

			<InfoBlock
				changeToRestaurant={changeToRestaurant}
				changeToHome={changeToHome}
				isHome={isHome}
				data={data}
				total={total}
				isOpenAddress={isOpenAddress}
				openAddress={openAddress}
				handleOptionChange={handleOptionChange}
				selectedOption={selectedOption}
				isOpenTable={isOpenTable}
				OpenTable={OpenTable}
			/>

			<div className={styles.footer_buttons}>
				{!isHome && (
					<button
						className={cn(styles.footer_button, styles.left)}
						type="button"
					>
						Order
					</button>
				)}
				<button
					className={cn(styles.footer_button, styles.right)}
					type="button"
				>
					Pay
				</button>
			</div>
		</div>
	);
};

export default Checkout;
