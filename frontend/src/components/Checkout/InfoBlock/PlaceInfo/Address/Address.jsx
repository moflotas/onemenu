import React from "react";
import styles from "../PlaceInfo.module.scss"
import cn from "classnames"
import { reload } from "../../../../../pictures/svg";

const Address = ({ openAddress, isOpenAddress, data, handleOptionChange, selectedOption }) => {
    return (
        <div>
            <div className={styles.info_block}>
                <div>
                    <span className={styles.info_title}>Address: </span>
                    <span className={styles.info_data}>{data.address}</span>
                </div>
                <svg 
                    onClick={openAddress} 
                    className={cn(styles.info_image, {[styles.rotated] : isOpenAddress})} 
                    viewBox="0 0 24 24" 
                >
                    <path d={reload} fill="currentColor"/>
                </svg>
                </div>
            <div>
                {isOpenAddress && (
                    <div className={styles.checkboxes}>
                        <label>
                            <input 
                            type="radio"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                            />
                            54, Volzhaskya st. 4, Innocity
                        </label>
                        <label>
                            <input 
                            type="radio"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                            />
                            Choose another address
                        </label>
                        {selectedOption === "option2" && (
                            <div className={styles.inputs}>
                                <input 
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your city"
                                />
                                <input 
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your street" 
                                />
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your house"
                                />
                                <input 
                                    className={styles.input}
                                    type="text"
                                    placeholder="Enter your apartment" 
                                />
                            </div>
                        )}
                    </div>
                )} 
            </div>
        </div>
    )
}

export default Address;