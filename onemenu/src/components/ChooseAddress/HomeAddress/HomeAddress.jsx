import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './HomeAddress.module.scss'

const HomeAddress = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
        <div className={styles.address}>
            <div className={styles.title}>
                Choose your address
            </div>

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
                            type="text"
                            placeholder="Enter your city"
                         />
                        <input 
                            type="text"
                            placeholder="Enter your street" 
                        />
                        <input
                            type="text"
                            placeholder="Enter your house"
                        />
                        <input 
                            type="text"
                            placeholder="Enter your apartment" 
                        />
                    </div>
                )}
                <label>
                    <input 
                    type="radio"
                    value="option3"
                    checked={selectedOption === 'option3'}
                    onChange={handleOptionChange}
                     />
                    Choose later
                </label>
                
            </div>

            <div className={styles.buttons}>
                <Link to="/choose-place">
                    <button>Back</button>
                </Link>
                <Link to="/menu">
                    <button>Next</button>
                </Link>
            </div>
        </div>
    )
}

export default HomeAddress;