import React from "react";
import styles from "./Cards.module.scss";
import Card from "./Card/Card";
import TextCard from "./Card/textCard";
import cn from "classnames";

const Cards = ({ hasImage, togglePopup, groupedMenu }) => {
	return (
		<div>
			{Object.keys(groupedMenu).map((category) => (
				<div
					key={category}
					className={cn(styles.category, { [styles.mb]: !hasImage })}
				>
					<span id={category} className={styles.category_title}>{category}</span>
					<div
						className={cn(styles.cards, {
							[styles.no_gap]: !hasImage,
						})}
					>
						{groupedMenu[category].map((item) =>
							hasImage ? (
								<button
									onClick={() => togglePopup(item)}
									key={item.id}
									className={styles.buttonCard}
								>
									<Card name={item.name} price={item.cost} image_url={item.image_url} />
								</button>
							) : (
								<TextCard
									key={item.id}
									item={item}
									togglePopup={togglePopup}
								/>
							)
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Cards;
