
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import app from './firebase.config'
import ForgetPassword from './Components/ForgotPassword/ForgetPassword'
import AllUsers from './Components/AllUsers/AllUsers'
import Welcome from './Components/Welcome/Welcome';
import LayoutOne from './Layouts/LayoutOne';
import AllRequest from './Components/AllRequest/AllRequest';
import AllFriends from './Components/AllFriends/AllFriends';
import { useSelector } from 'react-redux';
import LayOutTwo from './Layouts/LayOutTwo';
import BlockLists from './Components/BlockLists/BlockLists';
import ChatPage from './Pages/ChatPage/ChatPage';

function App() {

  const redux = useSelector((state) => state.userData.value)

  const myRoute = createBrowserRouter(

    createRoutesFromElements(
      redux ?
        <Route>
          <Route path='/' element={<LayoutOne />}>
            <Route index element={<Home />} />
            <Route path='/allUsers' element={<AllUsers />} />
            <Route path='/allRequests' element={<AllRequest />} />
            <Route path='/allFriends' element={<AllFriends />} />
            <Route path='/blockList' element={<BlockLists />} />
            <Route path='/chat' element={<ChatPage />} />
          </Route>
        </Route>

        :
        <Route>
          <Route path='/' element={<LayOutTwo />}>
            <Route index element={<Welcome />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
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
