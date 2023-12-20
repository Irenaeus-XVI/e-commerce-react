import React from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
export default function Register() {


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
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
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="userEmail">Email</label>
                        <input type="email"
                            className='form-control'
                            id='userEmail'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password"
                            className='form-control'
                            id='userPassword'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="RePassword">RePassword</label>
                        <input type="password"
                            className='form-control'
                            id='RePassword'
                            name='rePassword'
                            value={formik.values.rePassword}
                            onChange={formik.handleChange} />
                    </div>


                    <div className="form-group mb-2">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel"
                            className='form-control'
                            id='phone'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange} />
                    </div>

                    <button className='btn bg-main text-white' type='submit'>Register</button>
                </form>
            </div>
        </>
    )
}
