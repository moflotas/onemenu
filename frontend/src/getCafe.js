import { useState } from "react";
import { CAFES } from "./api";

export let tg = window.Telegram.WebApp;


function getCafe(cafesArray) {
	const [cafe, setCafe] = useState(undefined);

	if (cafesArray && cafesArray.length > 0) {
		axios
			.get(CAFES + "/" + cafesArray[0].id)
			.then((r) => r.data)
			.then((cafeInfo) => {
                cafeInfo.menu = updatedMenu;
                setCafe(cafeInfo);
			})
			.catch((e) => console.log(e));
	}
    return {
        cafe
    }
}

export default getCafe;