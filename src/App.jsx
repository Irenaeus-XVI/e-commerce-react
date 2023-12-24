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
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import Details from './Components/Details/Details'
import CheckOut from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'
export default function App() {

  const { setToken } = useContext(TokenContext)
  useEffect(() => {

    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'))
    }

  }, [])

  const routes = createBrowserRouter([{
    path: '', element: <LayOut />, children: [
      {
        index: true, element: <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      },
      {
        path: 'products', element: <ProtectedRoutes>
          <Products />
        </ProtectedRoutes>
      },
      {
        path: 'details/:id', element: <ProtectedRoutes>
          <Details />
        </ProtectedRoutes>
      },
      {
        path: 'categories', element: <ProtectedRoutes>
          <Categories />
        </ProtectedRoutes>
      },
      {
        path: 'cart', element: <ProtectedRoutes>
          <Cart />
        </ProtectedRoutes>
      },
      {
        path: 'brands', element: <ProtectedRoutes>
          <Brands />
        </ProtectedRoutes>
      },
      {
        path: 'checkout', element: <ProtectedRoutes>
          <CheckOut />
        </ProtectedRoutes>
      },
      {
        path: 'allorders', element: <ProtectedRoutes>
          <AllOrders />
        </ProtectedRoutes>
      },
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
