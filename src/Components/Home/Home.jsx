import React from 'react'
import styles from './Home.module.css'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import Products from '../Products/Products'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from "react-helmet";
export default function Home() {
    return (
        <>

            <MainSlider />
            <CategoriesSlider />
            <Products />
            <Helmet>
                <title>Fresh Cart</title>
            </Helmet>
        </>
    )
}
