import React, { useEffect, useState } from 'react'
import styles from './Details.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
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

    useEffect(() => {
        getProductDetails(id)
    }, [])

    return (
        <>
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
                    <div className="col-md-4">
                        <img src={productDetails?.imageCover} alt="" className='w-100' />
                    </div>
                    <div className="col-md-8">
                        <h2>{productDetails?.title}</h2>
                        <p>{productDetails?.description}</p>
                        <p>{productDetails?.category.name}</p>
                        <div className="d-flex justify-content-between">
                            <h5>{productDetails?.price}</h5>
                            <h5>{productDetails?.ratingsAverage} <i className='fa fa-star rating-color'></i></h5>
                        </div>
                        <button className='btn bg-main w-100 text-white'>Add To Cart</button>
                    </div>
                </div>}
            </div>
        </>
    )
}
