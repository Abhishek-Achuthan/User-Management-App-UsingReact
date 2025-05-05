import {  useState } from "react"
import axios from "../../Axios/adminAxios"
import  {useNavigate}  from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken } from "../../store/admin/adminSlice"
import type { AppDispatch } from "../../store/store"


const AdminLogin = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [formData,setFormData] = useState({
        name:"",
        password:""
    })

    const navigate = useNavigate();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post('/adminLogin',formData);
            console.log(response.data);

            dispatch(setToken(response.data.token));
            localStorage.setItem('adminToken', response.data.token);

            navigate('/dashboard')
        }catch(err:any){
            console.log(err.message);
        }
    }

  return (
    <div className="bg-black flex flex-col items-center "> 
    <div className="flex flex-col items-center justify-center min-h-screen border-4">
      <h1 className="text-white text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} action="" >
        <div className="flex flex-col gap-3 text-white" >
          <label htmlFor="name">Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData,name :e.target.value})} placeholder="Enter your name" className="border border-white text py-1 px-2 rounded-sm"/>
          <label htmlFor="password">Password</label>
          <input type="password" value={formData.password} onChange={(e) => setFormData({...formData,password : e.target.value})} placeholder="Password" className="border border-white text py-1 px-2 rounded-sm" />
          <div className="flex justify-center">
            <button type="submit" className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ">
              <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Login
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin