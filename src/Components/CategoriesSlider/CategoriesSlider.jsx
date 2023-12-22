import React from 'react'
import styles from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function CategoriesSlider() {


    function getCategories() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }


    const { data, isLoading } = useQuery('AllCategories', getCategories)
    console.log(data?.data.data);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true
    };




    return (
        <>
            <Slider {...settings} className=''>

                {data?.data.data.map((category) =>
                    <>

                        <img src={category.image} alt="" height={300} className='w-100' />
                        <h4>{category.title}</h4>


                    </>
                )}
            </Slider>
        </>
    )
}
