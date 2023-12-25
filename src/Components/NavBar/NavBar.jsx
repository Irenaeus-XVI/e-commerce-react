import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import TokenContext from '../../Context/tokenContext'
import { CartContext } from '../../Context/cartContext'

export default function NavBar() {


    const { token, setToken, user } = useContext(TokenContext)
    const { totalNumberOfElements } = useContext(CartContext)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('userToken');
        setToken(null);
        navigate('/login');

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary " >
                <div className="container ">
                    <Link className="navbar-brand" to={''}>
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={''}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'products'}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'cart'}>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'categories'}>Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'brands'}> Brands</Link>
                            </li>


                        </ul> : ''}




                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            {token ? <li className="nav-item ">
                                <Link className="nav-link " to={'allorders'}> <span className='text-main'><i className="fa-solid fa-list"></i></span>MY ORDERS</Link>
                            </li> : ""}

                            <li className="nav-item">
                                <i className=' fab fa-facebook-f mx-1'></i>
                                <i className="fa-brands fa-x-twitter mx-1"></i>
                                <i className=' fab fa-instagram mx-1'></i>
                                <i className=' fa-brands fa-youtube mx-1'></i>
                                <i className="fa-brands fa-linkedin mx-1"></i>
                            </li>


                            {token ? <>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to={'cart'}>
                                        <i className='fa fa-shopping-cart text-main fa-xl '  ></i>
                                        <span className='bg-main text-white p-1 rounded position-absolute top-0 end-0'>{totalNumberOfElements}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active me-1 " aria-current="page" onClick={logOut}>LogOut</button>
                                </li>
                                <li className="nav-item">
                                    <span className="  text-main" aria-current="page"><i className="fa-regular fa-user"></i> {user?.name}</span>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'register'}>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'login'}>Login</Link>
                                </li>

                            </>}




                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}
