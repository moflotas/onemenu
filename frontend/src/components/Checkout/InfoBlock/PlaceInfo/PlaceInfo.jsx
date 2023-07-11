import React from "react";
import styles from './PlaceInfo.module.scss';
import { reload } from "../../../../pictures/svg";
import cn from "classnames";

const PlaceInfo = ( {isHome, data, isOpenAddress, openAddress, 
                    handleOptionChange, selectedOption } ) => {
    return (
        <div>
            {isHome ? (
                <div>
                    <div className={styles.info_block}>
                        <div>
                            <span className={styles.info_title}>Address: </span>
                            <span className={styles.info_data}>{data.address}</span>
                        </div>
                        <svg onClick={openAddress} className={cn(styles.info_image, {[styles.rotated] : isOpenAddress})} viewBox="0 0 24 24" >
                            <path d={reload} fill="currentColor"/>
                        </svg>
                    </div>
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
 
            ) : (
                <div>
                    <div className={styles.info_block}>
                        <div>
                            <span className={styles.info_title}>Restaurant: </span>
                            <span className={styles.info_data}>{data.restaurant}</span>
                        </div>
                        <svg className={styles.info_image} viewBox="0 0 24 24" >
                            <path d={reload} fill="currentColor"/>
                        </svg>
                    </div>
                    <div className={styles.info_block}>
                        <div>
                            <span className={styles.info_title}>Table: </span>
                            <span className={styles.info_data}>{data.table}</span>
                        </div>
                        <svg className={styles.info_image} viewBox="0 0 24 24" >
                            <path d={reload} fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            )}
            <div className={styles.info_block}>
                <div>
                    <span className={styles.info_title}>Payment: </span>
                    <span className={styles.info_data}>{data.payment}</span>
                </div>
                <svg className={styles.info_image} viewBox="0 0 24 24" >
                    <path d={reload} fill="currentColor"/>
                </svg>
            </div>
        </div>
    )
}

export default PlaceInfo;