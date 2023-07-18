import React from "react";
import App from "./App";

const TelegramApp = () => {
	let tg = window.Telegram.WebApp;
	tg.expand();
	return <App tg={tg} />;
};

export default TelegramApp;
