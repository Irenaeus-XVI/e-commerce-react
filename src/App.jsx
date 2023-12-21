import React, { useContext, useEffect } from 'react'
import NavBar from './Components/NavBar/NavBar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Register from './Components/Register/Register'
import LogIn from './Components/LogIn/LogIn'
import NotFound from './Components/NotFound/NotFound'
import Brands from './Components/Brands/Brands'
import TokenContext from './Context/tokenContext'

export default function App() {

  const { setToken } = useContext(TokenContext)
  useEffect(() => {

    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'))
    }
    
  }, [])

  const routes = createBrowserRouter([{
    path: '', element: <LayOut />, children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'categories', element: <Categories /> },
      { path: 'cart', element: <Cart /> },
      { path: 'brands', element: <Brands /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <LogIn /> },

      { path: '*', element: <NotFound /> }
    ]
  }])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
