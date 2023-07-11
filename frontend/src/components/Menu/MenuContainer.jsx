import { useState, useEffect, useRef } from "react";
import { CAFES } from "../../api";
import axios from 'axios'


const MenuContainer = () => {

  const [cafes, setCafes] = useState([]);
  const [cafe, setCafe] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupItem, setPopupItem] = useState();
  const [hasImage, setHasImage] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  // const [originalPosition, setOriginalPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get(CAFES)
    .then((r) => r.data)
    .then((cafesArray) => setCafes(cafesArray))
    .catch((e) => console.log(e));
  }, []);

  function getCafe() {
    axios.get(CAFES + '/' + cafes[1])
    .then((r) => r.data)
    .then((cafeInfo) => {
      setCafe(cafeInfo)
      console.log("Hi!")
      console.log("API " + CAFES + "/" + cafes[0])
    })
    .catch((e) => console.log(e))
  }

  function addCafe() {
    axios.post(CAFES, {
      title: "Small Boss",
      description: "The best cafe in the world",
      menu: []
    })
    .then((r) => r.data)
    .then((newCafe) => {
      setCafes([newCafe].concat(cafes));
      console.log(newCafe);
    })
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const choosingElement = document.getElementById("choosing");
  //     if (choosingElement) {
  //       if (originalPosition === 0) {
  //         setOriginalPosition(choosingElement.offsetTop);
  //       }
  //       const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  //       const isTopReached = scrollPosition >= originalPosition ;
  //       setIsFixed(isTopReached);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [originalPosition]);

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
    addCafe,
    cafe,
    getCafe
  };
};

export default MenuContainer;
