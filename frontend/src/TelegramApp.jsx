import React from "react"
import App from "./App";

const TelegramApp = () => {
    const tg = window.Telegram.WebApp;
    const theme = tg.themeParams;
    console.log(tg.themeParams.bg_color)
    // const isDesktop = ["weba", "tdesktop"].includes(tg.platform);

    return (
        <App />
    )
}

export default TelegramApp;