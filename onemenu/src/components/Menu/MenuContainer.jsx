import { useState, useEffect, useRef } from "react";

const MenuContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupItem, setPopupItem] = useState();
  const [hasImage, setHasImage] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [originalPosition, setOriginalPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const choosingElement = document.getElementById("choosing");
      if (choosingElement) {
        if (originalPosition === 0) {
          setOriginalPosition(choosingElement.offsetTop);
        }
        const scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        const isTopReached = scrollPosition >= originalPosition;
        setIsFixed(isTopReached);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [originalPosition]);

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
  };
};

export default MenuContainer;
