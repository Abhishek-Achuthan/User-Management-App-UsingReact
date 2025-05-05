import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { logoutUser } from "../../store/user/userSlice";
import { removeToken } from "../../store/user/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  console.log("User from Redux:", user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(removeToken());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const editProfile = () => {
    navigate("/editProfile", {
      state: { name: user.name, email: user.email, phone: user.phone },
    });
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md">
        <div className="mb-4 flex items-center justify-center">
          <img
            src={user.image || "default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Name:</span> {user.name}
            </li>
            <li>
              <span className="font-semibold">Phone:</span> {user.phone}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {user.email}
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            onClick={editProfile}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Edit Profile
          </button>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
