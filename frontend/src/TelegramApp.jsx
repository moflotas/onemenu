import React from "react";
import App from "./App";

const TelegramApp = () => {
	let tg = window.Telegram.WebApp;
	
	// const theme = tg.themeParams;
	return <App tg={tg} />;
};

export default TelegramApp;
