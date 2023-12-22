import React from 'react'
import styles from './Home.module.css'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import Products from '../Products/Products'
export default function Home() {
    return (
        <>
          
                    <CategoriesSlider />
                    <Products />
            
        </>
    )
}
