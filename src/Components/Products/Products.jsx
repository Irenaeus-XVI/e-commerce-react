import axios from 'axios'
import { useContext } from 'react'
import { Puff } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function Products() {


    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')

    }

    const { isLoading, data } = useQuery('Products', getProducts)
    const { addToCart, setTotalNumberOfElements } = useContext(CartContext)

    async function addCart(id) {
        const { data } = await addToCart(id)
        console.log(data, 'asd');
        if (data?.status == 'success') {
            toast.success(data.message, {
                position: 'top-right',
            });
            setTotalNumberOfElements(data.numOfCartItems)
        } else {
            toast.error(data.message, {
                position: 'top-right',
            });
        }
    }


    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
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

                        {data?.data.data.map((product) => (
                            <div className="col-md-2 " key={product._id}>
                                <div className="product px-2 py-2" >
                                    <Link to={`/details/${product._id}`}>
                                        <img src={product.imageCover} className='w-100' alt="" />
                                        <p className='text-main'>Category</p>
                                        <h3 className=' text-white'>{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                        <div className="d-flex justify-content-between">
                                            <p className=' text-white'>{product.price + 'Egp'}</p>
                                            <p>
                                                <i className='fa fa-star rating-color'>{product.ratingsAverage}</i>
                                            </p>
                                        </div>
                                    </Link>

                                    <button onClick={() => addCart(product._id)} className='btn bg-main text-white w-100'>Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>}

            </div>
        </>
    )
}
