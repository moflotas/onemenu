import React from "react";
import styles from "./Category.module.scss";
import cn from "classnames";

const Category = ({ data, selectCategory, selectedCategory, groupedMenu }) => {
	return (
		<div className={styles.choosing}>
			{Object.keys(groupedMenu).map((category) => (
				<a
					key={category}
					className={cn(styles.choosing_link, {
						[styles.choosing_link_clicked]:
							category === selectedCategory,
					})}
					href={`#${category}`}
					onClick={() => selectCategory(category)}
				>
					<span className={cn(styles.choosing_span)}>{category}</span>
				</a>
			))}
		</div>
	);
};

export default Category;
