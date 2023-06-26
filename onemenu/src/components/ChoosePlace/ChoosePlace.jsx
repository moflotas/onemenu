import React from "react";
import { Link } from "react-router-dom";


const ChoosePlace = () => {
    return (
        <div>
            <Link to="/choose-address-restaurant">
                <button>In restaurant</button>
            </Link>
            <Link to="/choose-address-home">
                <button>At home</button>
            </Link>
        </div>
    )
}

export default ChoosePlace;