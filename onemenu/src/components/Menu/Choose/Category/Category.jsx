import React from "react";
import styles from "./Category.module.scss"
import cn from "classnames"

const Category = ({ data, selectCategory, selectedCategory }) => {
    return (
        <div className={styles.choosing}>
            {data.map((category) => (
                <a
                    className={cn(styles.choosing_link, {
                    [styles.choosing_link_clicked]: category.category_id === selectedCategory,
                    })}
                    href={`#${category.category_id}`}
                    onClick={() => selectCategory(category.category_id)}
                >
                    <span className={cn(styles.choosing_span)}>{category.category}</span>
                </a>
            ))}
        </div>
    )
}

export default Category;