import { useState } from "react";
import { RegisterFormData } from "../../types/SignUp/auth";
import axios from "../../Axios/clientaxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SignUp = () => {
   const [formData,setFormData] = useState <RegisterFormData>({
    username:"",
    email:"",
    phone:"",
    password:"",
    image:undefined
   })
   const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // 👈 replace this
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Image upload failed!");
      return null;
    }
  };
  

   const navigate  = useNavigate();

   const handleSubmit = async(e :React.FormEvent <HTMLFormElement>) => {
    e.preventDefault();

    const {username , email, phone,password,image} = formData;

    if(!username || !email || !password || !phone) {
      toast.error("All fields are required")
      // return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if(phone.length < 10) {
      toast.error('Phone number must be atleast 10 charchters')
      return;
    }

    if(password.length < 6) {
      toast.error('Password must be atleast 6 digits')
      return;
    }

   try{
    let imageUrl = '';
    if(image instanceof File) {
      const uploaded = await uploadImageToCloudinary(image);
      if(!uploaded) return;
      imageUrl = uploaded;
    }
    const response = await axios.post('/register',{
      ...formData,
      image : imageUrl
   });
    console.log(response.data);
    
    navigate('/login',{replace:true})

   }catch(err:any){
    const errorMessage = err.response?.data?.message || "Something went wrong";
   toast.error(errorMessage);
    console.error(errorMessage);
   }
  }
  
  return (
    <div className="bg-black flex flex-col items-center "> 
      <div className="flex flex-col items-center justify-center min-h-screen border-4">
        <h1 className="text-white text-xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} action="" >
          <div className="flex flex-col gap-3 text-white" >
            <label htmlFor="username">Name </label>
            <input type="text" value={formData.username} onChange={(e) => setFormData({...formData,username : e.target.value})} placeholder="Username" className="border border-white text py-1 px-2 rounded-sm"/>
            <label htmlFor="email">Email</label>
            <input type="text" value={formData.email} onChange={(e) => setFormData({...formData,email :e.target.value})} placeholder="Enter your email" className="border border-white text py-1 px-2 rounded-sm"/>
            <label htmlFor="phone">Phone</label>
            <input type="number" value={formData.phone} onChange={(e) => setFormData({...formData,phone : e.target.value})} placeholder="Enter your phone number" className="border border-white text py-1 px-2 rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            <label htmlFor="password">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData,password : e.target.value})} placeholder="Password" className="border border-white text py-1 px-2 rounded-sm" />
            <label htmlFor="image">Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if(file) setFormData({...formData,image:file});
            }}
            className="border border-white text py-1 px-2 rounded-sm"
            />
            <p>Already have account ? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
            <div className="flex justify-center">
              <button type="submit" className="inline-flex items-center justify-center p-0.5 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ">
                <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Sign in
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
