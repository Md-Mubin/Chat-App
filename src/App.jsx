
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import app from './firebase.config'
import LayoutTwo from './Layouts/LayoutTwo'
import ForgetPassword from './Components/ForgotPassword/ForgetPassword'
import AllUsers from './Components/AllUsers/AllUsers'
import Welcome from './Components/Welcome/Welcome';

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/userCreate' element={<Welcome />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/' element={<LayoutTwo />}>
          <Route index element={<Home />} />
          <Route path='/allUsers' element={<AllUsers />} />
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
