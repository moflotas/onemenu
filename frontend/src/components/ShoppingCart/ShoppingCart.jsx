import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ShoppingCart.module.scss";
import axios from "axios";
import { ORDER } from "../../api";
import { getQuantity, updateItem } from "../../updateItem";

const ShoppingCart = ({ tg }) => {
	let [data, setData] = useState([]);
	let [numbers, setNumbers] = useState([]);
	let [totalCost, setTotalCost] = useState()

	useEffect(() => {
		axios
			.get(ORDER + "/active/" + tg.tg.initDataUnsafe.user.id)
			.then((r) => r.data)
			.then((order) => {
				setData(order.items);
				let numbers = [];
				for (let item of order.items) {
					numbers.push(item.quantity);
				}
				setNumbers(numbers);
			})
			.catch((e) => console.log(e));
	}, []);

	const totalPrice = data
		.reduce((sum, item) => sum + item.cost * item.quantity, 0)
		.toFixed(2);

	return (
		<div className={styles.cart}>
			<div className={styles.title}>Your order</div>
			<div className={styles.dishes}>
				{data.map((food, index) => (
					<div className={styles.order} key={food.id}>
						<div className={styles.order_description}>
							<img
								className={styles.order_image}
								src={food.image_url}
								alt=""
							/>
							<div className={styles.order_text}>
								<span>{food.name}</span>
								<span className={styles.order_price}>
									{food.cost} rub
								</span>
							</div>
						</div>
						<div className={styles.order_number}>
							<button
								className={styles.order_button}
								onClick={() => {
									let foodCopy = {...food};
									foodCopy.id = food.dish_id;
									updateItem(false, foodCopy, tg, (quantity) => {
										let numbers_local = [...numbers];
										numbers_local[index] = quantity;
										setNumbers(numbers_local);
									})
								}
								}
							>
								-
							</button>
							<span className={styles.order_number}>
								{numbers[index]}
							</span>
							<button
								className={styles.order_button}
								onClick={() => {
									let foodCopy = {...food};
									foodCopy.id = food.dish_id;
									updateItem(true, foodCopy, tg, (quantity) => {
										let numbers_local = [...numbers];
										numbers_local[index] = quantity;
										setNumbers(numbers_local);
									})
								}
								}
							>
								+
							</button>
						</div>
					</div>
				))}
			</div>
			<div className={styles.order_total}>
				<span>Total sum: {totalPrice} rub</span>
			</div>
			<div className={styles.button}>
				<Link to="/checkout">
					<button className={styles.button_order}>Order</button>
				</Link>
			</div>
		</div>
	);
};

export default ShoppingCart;
