import { useState, useEffect, useRef } from "react";
import { CAFES, ORDER } from "../../api";
import axios from "axios";
import { tg } from "../../updateItem";


let cafe_global = undefined


const MenuContainer = () => {
	const [cafe, setCafe] = useState(undefined);
	const [order, setOrder] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [popupItem, setPopupItem] = useState();
	const [hasImage, setHasImage] = useState(true);
	const [isFixed, setIsFixed] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		if (cafe_global === undefined) {
			axios
				.get(CAFES)
				.then((r) => r.data)
				.then((cafesArray) => {
					getCafe(cafesArray);
				})
				.catch((e) => console.log(e));
		}
		else {
			setCafe(cafe_global);
		}
	}, []);

	function getCafe(cafesArray) {	
		if (cafesArray.length > 0) {
			axios
				.get(CAFES + "/" + cafesArray[0].id)
				.then((r) => r.data)
				.then((cafeInfo) => {
					setCafe(cafeInfo);
					cafe_global = cafeInfo;
				})
				.catch((e) => console.log(e));
		}
		return {
			cafe
		}
	}

	function getOrder() {
		return axios
			.get(ORDER + "/active/" + tg.initDataUnsafe.user.id)
			.then((r) => r.data)
			.catch((e) => console.log(e));
	}

	const togglePopup = (item) => {
		setIsOpen(!isOpen);
		setPopupItem(item);
		if (document.body.style.overflow !== "hidden") {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	};

	const menuRef = useRef(null);

	const changeTypeToText = () => {
		setHasImage(false);
	};

	const changeTypeToImage = () => {
		setHasImage(true);
	};

	const selectCategory = (category) => {
		setSelectedCategory(category);
		const categoryElement = document.getElementById(category);
		if (categoryElement) {
			categoryElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	const groupedMenu =
		cafe && cafe.menu
			? cafe.menu.reduce((groups, item) => {
					const category = item.category;
					if (!groups[category]) {
						groups[category] = [];
					}
					groups[category].push(item);
					return groups;
			  }, {})
			: {};

	return {
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
		groupedMenu,
	};
};

export default MenuContainer;
