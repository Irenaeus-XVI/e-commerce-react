import React from 'react'
import styles from './MainSlider.module.css'
import mainSlider1 from '../../assets/images/slider-image-1.jpeg'
import mainSlider2 from '../../assets/images/slider-image-2.jpeg'
import mainSlider3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
    };
    return (
        <>
            <div className="container my-5">
                <div className="row g-0">
                    <div className="col-md-9">
                        <Slider {...settings}>
                            <img height={400} src={mainSlider1} alt="" className='w-100' />
                            <img height={400} src={mainSlider2} alt="" className='w-100' />
                            <img height={400} src={mainSlider3} alt="" className='w-100' />
                        </Slider>
                    </div>
                    <div className="col-md-3">
                        <img height={200} src={blog1} alt="" className='w-100' />
                        <img height={200} src={blog2} alt="" className='w-100' />
                    </div>
                </div>
            </div>
        </>
    )
}
