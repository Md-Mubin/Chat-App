
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutOne from './Layouts/LayoutOne'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import app from './firebase.config'
import LayoutTwo from './Layouts/LayoutTwo'
import ForgetPassword from './Components/ForgotPassword/ForgetPassword'

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<LayoutOne />}>
          <Route index element={<Auth />} />
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        </Route>
        <Route path='/userProfile' element={<LayoutTwo />}>
          <Route index element={<Home />} />
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
