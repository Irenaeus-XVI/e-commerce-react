import React from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';



export default function Register() {



    const validationSchema = Yup.object({
        name: Yup.string().max(15, 'name is to long'),
        email: Yup.string().email('email not valid'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, 'password not match '),
        rePassword: Yup.string().oneOf([Yup.ref('password')],'password not match password '),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Please Enter Egyptian Number ')
    }).required()


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }, validationSchema,
        onSubmit: (values) => console.log('submit', values)
    })

    return (
        <>

            <div className="container my-5">
                <h2 className='mb-3'>Register Now:</h2>
                <form action="" className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.name ? <div className="alert alert-danger">  {formik.errors.name}</div> : ''}
                    </div>


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


                    <div className="form-group mb-2">
                        <label htmlFor="RePassword">RePassword</label>
                        <input type="password"
                            className='form-control'
                            id='RePassword'
                            name='rePassword'
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.rePassword ? <div className="alert alert-danger">  {formik.errors.rePassword}</div> : ''}

                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel"
                            className='form-control'
                            id='phone'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.phone ? <div className="alert alert-danger">  {formik.errors.phone}</div> : ''}

                    </div>

                    <button className='btn bg-main text-white' type='submit'>Register</button>
                </form>
            </div>
        </>
    )
}
