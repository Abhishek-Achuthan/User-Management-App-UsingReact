import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "../../Axios/clientaxios";
import { EditableUser } from "../../types/user/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/user/userSlice";

const EditUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user);
  const [user, setUsr] = useState<EditableUser>({
    name: users.name,
    email: users.email,
    phone: users.phone,
    image: users.image,
  });

  useEffect(() => {
    if (users.name && users.email && users.phone && users.image) {
      setUsr({
        name: users.name,
        email: users.email,
        phone: users.phone,
        image: users.image,
      });
    }
  }, [users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsr({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put("/profile", user);
      if (res.status === 200) {
        console.log("this is me", res.data);
        const updatedUser = {
          name: res.data.username,
          phone: res.data.phone,
          email: res.data.email,
          token: users.token,
          image: res.data.image,
        };
        console.log("token checkung process", updatedUser);
        dispatch(setUser(updatedUser));

        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
      }
    } catch (err) {
      console.log("Update error", err);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); 
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setUsr(prev => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
    }finally {
      setIsUploading(false)
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-md rounded-xl p-6 w-full max-w-md space-y-4 text-white"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Edit Profile
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-white"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-white"
          >
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit" 
            disabled = {isUploading}
            className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 "
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Save Changes
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
