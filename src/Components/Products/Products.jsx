import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
export default function Products() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getProducts() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products?')
        console.log(data.data);
        setProducts(data.data)
        setIsLoading(false)
    }


    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>

            <div className="container py-5">
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
                </div>
                
                    : <div className="row">

                        {products.map((product) => (
                            <div className="col-md-2 " key={product._id}>
                                <div className="product px-2 py-2">

                                    <img src={product.imageCover} className='w-100' alt="" />
                                    <p className='text-main'>Category</p>
                                    <h3>{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                    <div className="d-flex justify-content-between">
                                        <p>{product.price + 'Egp'}</p>
                                        <p>
                                            <i className='fa fa-star rating-color'>{product.ratingsAverage}</i>
                                        </p>
                                    </div>
                                    <button className='btn bg-main text-white w-100'>Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>}

            </div>
        </>
    )
}
