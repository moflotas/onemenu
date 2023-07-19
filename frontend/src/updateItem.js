import axios from "axios";
import { ORDER } from "./api";


export let tg = window.Telegram.WebApp;

export function updateItem(isAdd, item, tg, setNumber) {
  axios
    .get(ORDER + "/active/" + tg.tg.initDataUnsafe.user.id)
    .then((r) => r.data)
    .then((order) => {
      let quantity = getQuantity(item.id, order) + (isAdd ? 1 : -1);
      if (quantity < 0)
          quantity = 0;
      axios.post(ORDER + "/item", {
        // cost: item.cost,
        dish_id: item.id,
        // image_url: item.image_url,
        // name: item.name,
        order_id: order.id,
        quantity: quantity,
      });

      return quantity;
    })
    .then((quantity) => {
      setNumber(quantity);
    })
    .catch((e) => console.log(e));
}

export function getQuantity(id, order) {
  for (let item of order.items) {
    if (item.dish_id === id) {
      return item.quantity;
    }
  }
  return 0;
}
