import {  useState } from "react"
import { LoginFormData } from "../../types/SignUp/auth"
import axios from "../../Axios/clientaxios"
import  {useNavigate}  from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken } from "../../store/user/tokenSlice"
import { setUser } from "../../store/user/userSlice"
import type { AppDispatch } from "../../store/store"


const Login = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [formData,setFormData] = useState <LoginFormData>({
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        try{
            const response = await axios.post('/login',formData);
            console.log(response.data);
            dispatch(setToken(response.data.token));
            dispatch(setUser({
              name: response.data.name,
              email: response.data.email,
              phone: response.data.phone,
              token: response.data.token,
              image : response.data.image,
            }))
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
              name: response.data.name,
              email: response.data.email,
              phone: response.data.phone,
              token: response.data.token
            }));
            navigate('/',{replace:true})
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
          <label htmlFor="email">Email</label>
          <input type="text" value={formData.email} onChange={(e) => setFormData({...formData,email :e.target.value})} placeholder="Enter your email" className="border border-white text py-1 px-2 rounded-sm"/>
          <label htmlFor="password">Password</label>
          <input type="password" value={formData.password} onChange={(e) => setFormData({...formData,password : e.target.value})} placeholder="Password" className="border border-white text py-1 px-2 rounded-sm" />
          <p>don't have a account ? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/register')}>SignUp</span></p>
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

export default Login