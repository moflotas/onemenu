import React, { useState } from "react";

const CheckoutContainer = () => {
	const [isHome, setIsHome] = useState(true);
	const [isOpenAddress, setIsOpenAddress] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
    const [isOpenTable, setIsOpenTable] = useState();

	const changeToRestaurant = () => {
		setIsHome(false);
		setIsOpenAddress(false);
	};

	const changeToHome = () => {
		setIsHome(true);
		setIsOpenAddress(false);
	};

	const openAddress = () => {
		setIsOpenAddress(!isOpenAddress);
	};

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const OpenTable = () => {
		setIsOpenTable(!isOpenTable);
	};


	return {
		isHome,
		isOpenAddress,
        isOpenTable,
		selectedOption,
		changeToRestaurant,
		changeToHome,
		openAddress,
        OpenTable,
		handleOptionChange,
	};
};

export default CheckoutContainer;
