import { useState, useEffect, useRef } from "react";
import { CAFES } from "../../api";
import axios from 'axios'


const MenuContainer = () => {
  
  const [cafe, setCafe] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupItem, setPopupItem] = useState();
  const [hasImage, setHasImage] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    axios.get(CAFES)
      .then((r) => r.data)
      .then((cafesArray) => {
        getCafe(cafesArray);
      })
      .catch((e) => console.log(e));
  }, []);
  
  function getCafe(cafesArray) {
    if (cafesArray.length > 0) {
      axios.get(CAFES + '/' + cafesArray[0].id)
        .then((r) => r.data)
        .then((cafeInfo) => {
          setCafe(cafeInfo);
        })
        .catch((e) => console.log(e));
    }
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
      categoryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    cafe
  };
};

export default MenuContainer;
