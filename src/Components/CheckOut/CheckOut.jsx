import React, { useContext, useEffect } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/cartContext'
export default function CheckOut() {

    const { onlinePayment, getInitialCart } = useContext(CartContext)

    // useEffect(() => { getInitialCart() }, [])
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: payment
    })


    async function payment(values) {
        console.log(values);
        let { data } = await onlinePayment(values)
        console.log(data.session.url);
        window.location.href = data.session.url
    }
    return (
        <>
            <div className='w-100 mx-auto bg-main-light p-5'>
                <h2>Shipping Address</h2>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="details">Details</label>
                        <input type="text" className='form-control' id='details' name='details'
                            value={formik.values.details}
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input type="num" className='form-control' id='phone' name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="city">City</label>
                        <input type="text" className='form-control' id='city' name='city'
                            value={formik.values.city}
                            onChange={formik.handleChange} />
                    </div>
                    <button className='btn bg-main w-100 text-white' type='submit'>Pay Now</button>
                </form>
            </div>

        </>
    )
}
