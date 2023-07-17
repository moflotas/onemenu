import React from "react";
import styles from "./Menu.module.scss";
import cn from "classnames";
import Popup from "./Popup/Popup";
import MenuContainer from "./MenuContainer";
import Category from "./Choose/Category/Category";
import Cards from "./Cards/Cards";
import Type from "./Choose/Type/Type";

const Menu = () => {
	const {
		isOpen,
		popupItem,
		hasImage,
		isFixed,
		selectedCategory,
		togglePopup,
		menuRef,
		changeTypeToText,
		changeTypeToImage,
		selectCategory,
		cafe,
		groupedMenu
	} = MenuContainer();

	return (
		<div className={styles.menu}>
			<div className={styles.title}>Menu</div>

			<Type
				hasImage={hasImage}
				changeTypeToImage={changeTypeToImage}
				changeTypeToText={changeTypeToText}
			/>

			<div
				className={cn(styles.sm, { [styles.fixedContainer]: isFixed })}
				id="choosing"
				ref={menuRef}
			>
				<Category
					selectCategory={selectCategory}
					selectedCategory={selectedCategory}
					groupedMenu={groupedMenu}
				/>
			</div>

			{isOpen && (
				<Popup popupItem={popupItem} togglePopup={togglePopup} />
			)}

			<Cards
				cafe={cafe}
				togglePopup={togglePopup}
				hasImage={hasImage}
				groupedMenu={groupedMenu}
			/>
		</div>
	);
};

export default Menu;
