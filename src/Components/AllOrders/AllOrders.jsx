import React, { useContext, useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import TokenContext from '../../Context/tokenContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Puff } from 'react-loader-spinner';

export default function AllOrders() {
    const { user } = useContext(TokenContext);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { isLoading, data, error, refetch } = useQuery('UserOrders', getUserOrders, {
        enabled: false,
    });

    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch]);

    function getUserOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`).then((response) => response.data);
    }

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    console.log(data);

    return (
        <>
            <div className="container">
                <div className="row py-3">
                    <h1 className=''>All Orders</h1>

                    {isLoading ? (
                        <div className='d-flex justify-content-center '>
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
                    ) : (
                        <>
                            <div className="col-md-4 ">
                                {data?.map((order, index) => (
                                    <div
                                        className={`bg-light-subtle  shadow-lg p-3 border my-2`}
                                        key={index}
                                        onClick={() => handleOrderClick(order)}
                                    >
                                        <h3 className='fw-bold mb-2'>Order#{order.id}</h3>
                                        <div className="d-flex justify-content-between">
                                            <p>{order.cartItems.length} Items</p>
                                            <p className='text-main'>{order.totalOrderPrice} EGP</p>
                                        </div>
                                        <p className='fw-bold'>Date: {order.createdAt}</p>
                                        <div className="d-flex justify-content-between ">
                                            <p className='fw-bold'>Status: {order.isDelivered ? <span className='rounded badge bg-success'>Delivered</span> : <span className='rounded badge bg-danger'>NotDelivered</span>}</p>
                                            <p>Status: {order.isDelivered ? <span className='rounded badge bg-success'>Paid</span> : <span className='rounded badge bg-danger'>unpaid</span>}</p>
                                        </div>
                                        <button className='btn bg-main w-100'>View Details</button>
                                    </div>
                                ))}
                            </div>



                            <div className="col-md-8 ">
                                {selectedOrder && (
                                    <>
                                        <div className="rounded shadow-lg  bg-light-subtle p-4 my-2 border">
                                            <h3 className='fw-bold mb-2'>Order#{selectedOrder.id}</h3>
                                            <div className="d-flex justify-content-between">
                                                <p>{selectedOrder.cartItems.length} Items</p>
                                                <p className='text-main'>{selectedOrder.totalOrderPrice} EGP</p>
                                            </div>


                                            <div className="rounded p-4 my-2 border">
                                                <h3 className='fw-bold mb-2'></h3>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <p>Delivery Address</p>
                                                        <p><i class="fa-solid fa-circle-info text-main"></i> {selectedOrder.shippingAddress.details}</p>
                                                        <p><i className="fa-solid fa-city text-main"></i> {selectedOrder.shippingAddress.city}</p>
                                                        <p><i className="fa-solid fa-phone text-main" ></i> {selectedOrder.shippingAddress.phone}</p>

                                                    </div>
                                                    <div>
                                                        <p>Payment Method</p>
                                                        <p> {selectedOrder.paymentMethodType === 'card' ? <> <i className="fa-solid fa-money-bill text-main"></i> {selectedOrder.paymentMethodType}</> : <> <i className="fa-solid fa-credit-card text-main"></i> {selectedOrder.paymentMethodType}</>}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className=' fw-bolder'>Items</p>
                                            <div className="rounded p-4 my-2 border">
                                                {selectedOrder.cartItems.map((product) => (
                                                    <>
                                                        <div className='row py-2 border-bottom' key={product.product._id}>
                                                            <div className='col-md-1'>
                                                                <img src={product.product.imageCover} alt='' className='w-100' />
                                                            </div>

                                                            <div className='col-md-11'>
                                                                <div className='d-flex justify-content-between'>
                                                                    <div className='left-side'>
                                                                        <h4>{product.product.title}</h4>
                                                                        <p className='text-main'>{product.price}EGP</p>
                                                                    </div>

                                                                    <div className='right-side d-flex justify-content-center align-items-center'>

                                                                        <span className='mx-2'>{product.count}</span>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>
                                                ))}

                                            </div>

                                            <div className="ms-auto w-50">
                                                <p className='fw-bold'>Sub-total:  <span className='text-main fw-bold'>{selectedOrder.totalOrderPrice} EGP</span></p>
                                                <p className='fw-bold'>Items:  <span className='text-main fw-bold'>{selectedOrder.cartItems.length}</span></p>
                                                <p className='fw-bold'>Tax:  <span className='text-main fw-bold'>{selectedOrder.taxPrice} EGP</span></p>

                                                <p className='fw-bold'>Delivery Fees:  <span className='text-main fw-bold'>{selectedOrder.shippingPrice} EGP</span></p>
                                                <p className='fw-bold h4'>Order Total:  <span className='text-main fw-bold'>{selectedOrder.totalOrderPrice + selectedOrder.shippingPrice + selectedOrder.taxPrice} EGP </span ></p>
                                            </div>




                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
