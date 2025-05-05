import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/User/Login"
import SignUp from "./Pages/User/SignUp"
import Home from "./Pages/User/Home"
import ProtectedRoute from "./Components/ProtectedRoute"
import EditUser from "./Pages/User/EditUser"
import AdminLogin  from './Pages/Admin/AdminLogin'
import Dashboard from "./Pages/Admin/Dashboard"
import EditUsers from "./Pages/Admin/EditUsers"


function App() {

  const router = createBrowserRouter([
    {path : "/login", element :   <Login/>},
    {path : "/register", element : <SignUp/>},
    {path : "/" , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path : "/editProfile", element : <ProtectedRoute><EditUser/></ProtectedRoute>},
    {path : '/adminLogin' , element :<AdminLogin/> },
    {path : '/dashboard', element : <Dashboard/>},
    {path : '/editUser', element : <EditUsers/>}
  ])
  return (
    <>
 <RouterProvider router={router} />
    </>
  )
}

export default App
