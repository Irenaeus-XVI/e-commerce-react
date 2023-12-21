import React, { useState } from 'react'
import styles from './LogIn.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function LogIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const navigate = useNavigate()

    const signIn = async (values) => {
        setIsLoading(true)
        setApiError('')
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((error) => {
            console.log(error.response.data.message);
            setApiError(error.response.data.message)
            setIsLoading(false)

        })
        // console.log(data);
        if (data.message == 'success') {
            setIsLoading(false)
            navigate('/')
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('email not valid'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, 'password not match '),
    }).required()


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        }, validationSchema,
        onSubmit: (values) => signIn(values)
    })

    return (
        <>

            <div className="container my-5">
                <h2 className='mb-3'>LogIn Now:</h2>
                {apiError ? <div className='alert alert-danger'>{apiError}</div> : ''}
                <form action="" className='w-75 mx-auto' onSubmit={formik.handleSubmit}>



                    <div className="form-group mb-2">
                        <label htmlFor="userEmail">Email</label>
                        <input type="email"
                            className='form-control'
                            id='userEmail'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.email ? <div className="alert alert-danger">  {formik.errors.email}</div> : ''}

                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password"
                            className='form-control'
                            id='userPassword'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.password ? <div className="alert alert-danger">  {formik.errors.password}</div> : ''}

                    </div>


                    {isLoading ? <button className='btn bg-main text-white' type='submit'>
                        <i className='fa fa-spin fa-spinner'></i>
                    </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='submit'>Log In</button>}


                </form>
            </div>
        </>
    )
}
