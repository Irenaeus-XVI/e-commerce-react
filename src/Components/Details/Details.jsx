import React, { useContext, useEffect, useState } from 'react'
import styles from './Details.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";
export default function Details() {

    const { id } = useParams()

    const [productDetails, setProductDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)



    async function getProductDetails(id) {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        console.log(data.data);
        setIsLoading(false)
        setProductDetails(data.data)
    }

    const { addToCart, setTotalNumberOfElements } = useContext(CartContext)

    async function addCart(id) {
        const data = await addToCart(id)
        console.log(data.data, 'asd');
        if (data.data?.status == 'success') {
            toast.success(data.data?.message, {
                position: 'top-right',
            });
            setTotalNumberOfElements(data.data.numOfCartItems)
        } else {
            toast.error(data.response.data.message, {
                position: 'top-right',
            });
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    useEffect(() => {
        getProductDetails(id)
    }, [])

    return (
        <>

            <Helmet>
                <title>{productDetails.title}</title>
            </Helmet>
            <div className="container">
                {isLoading ? <div className='d-flex justify-content-center'>
                    <Puff
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div> : <div className="row align-items-center">
                    <div className="col-md-4 mb-3">
                        <Slider {...settings}>
                            {productDetails.images.map((img, index) => <img className='w-100' src={img} key={index} />)}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h2>{productDetails?.title}</h2>
                        <p>{productDetails?.description}</p>
                        <p>{productDetails?.category.name}</p>
                        <div className="d-flex justify-content-between">
                            <h5>{productDetails?.price}</h5>
                            <h5>{productDetails?.ratingsAverage} <i className='fa fa-star rating-color'></i></h5>
                        </div>
                        <button onClick={() => addCart(productDetails._id)} className='btn bg-main w-100 text-white'>Add To Cart</button>
                    </div>
                </div>}
            </div>
        </>
    )
}
