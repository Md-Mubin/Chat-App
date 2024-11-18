
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutOne from './Layouts/LayoutOne'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import app from './firebase.config'

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<LayoutOne />}>
          <Route index element={<Auth />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
      <ToastContainer />
      <RouterProvider router={myRoute} />
    </>
  )
}

export default App
