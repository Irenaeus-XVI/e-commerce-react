import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/cartContext';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Cart() {
    const {
        getCart,
        deleteProductFromCart,
        updateProductQuantity,
        deleteUserCart,
        setTotalNumberOfElements,
    } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const { data } = await getCart();
                setCartDetails(data);
                setTotalNumberOfElements(data?.numOfCartItems);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCartDetails();
    }, [getCart]);

    const removeItem = async (id) => {
        try {
            const { data } = await deleteProductFromCart(id);
            if (data.status === 'success') {
                setCartDetails(data);
                if (data.numOfCartItems === 0) {
                    deleteCart();
                }
                setTotalNumberOfElements(data.numOfCartItems);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateCount = async (id, count) => {
        try {
            const { data } = await updateProductQuantity(id, count);
            if (data.status === 'success') {
                data.data.products.forEach((product) => {
                    if (product.count === 0) {
                        removeItem(product.product._id);
                    }
                });
                setCartDetails(data);
            }
        } catch (error) {
            console.error('Error updating product count:', error);
        }
    };

    const deleteCart = async () => {
        try {
            const { data } = await deleteUserCart();
            setCartDetails(null);
            setTotalNumberOfElements(data.numOfCartItems);
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    };

    const renderLoader = () => (
        <div className='d-flex justify-content-center'>
            <Puff visible={true} height='80' width='80' color='#4fa94d' ariaLabel='puff-loading' wrapperStyle={{}} wrapperClass='' />
        </div>
    );

    const renderCartContent = () => (
        <div className='container my-5'>
            <div className='w-100 mx-auto bg-main-light p-5'>
                <h1 className='mb-4'>Cart Shop</h1>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='h5'>
                        Total Price <span className='text-main'>{cartDetails?.data.totalCartPrice} EGP</span>
                    </h3>
                    <h3 className='h5'>
                        Total Cart Items: <span className='text-main'>{cartDetails?.numOfCartItems}</span>
                    </h3>
                </div>

                {cartDetails.data.products.map((product) => (
                    <div className='row py-2 border-bottom' key={product.product._id}>
                        <div className='col-md-1'>
                            <img src={product.product.imageCover} alt='' className='w-100' />
                        </div>
                        <div className='col-md-11'>
                            <div className='d-flex justify-content-between'>
                                <div className='left-side'>
                                    <h4>{product.product.title}</h4>
                                    <p>{product.price}EGP</p>
                                </div>

                                <div className='right-side d-flex justify-content-center align-items-center'>
                                    {product.count === 1 ? (
                                        <button disabled={true} onClick={() => updateCount(product.product._id, product.count - 1)} className='btn btn-success'>
                                            -
                                        </button>
                                    ) : (
                                        <button disabled={false} onClick={() => updateCount(product.product._id, product.count - 1)} className='btn btn-success'>
                                            -
                                        </button>
                                    )}
                                    <span className='mx-2'>{product.count}</span>
                                    <button onClick={() => updateCount(product.product._id, product.count + 1)} className='btn btn-success'>
                                        +
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => removeItem(product.product._id)} className='btn text-danger p-0'>
                                <i className='fa fa-trash-can'></i> remove
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={deleteCart} className='btn btn-danger w-100 mt-3'>
                    Delete Cart
                </button>
                <Link to={'/checkout'} className='btn bg-main text-white w-100 mt-3'>
                    Check Out
                </Link>
            </div>
        </div>
    );


    const renderEmptyCart = () => (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className=' text-center'>
                <h3>Your Cart Is Empty</h3>
                <Link to={'/'} className='btn bg-main text-white'>
                    Browse Products List
                </Link>
            </div>
        </div>
    );

    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>

        {loading ? renderLoader() : cartDetails && cartDetails.data ? renderCartContent() : renderEmptyCart()}</>;
}
