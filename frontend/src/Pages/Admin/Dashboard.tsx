import { useEffect, useState } from "react";
import axios from "../../Axios/adminAxios";
import { addUser } from "../../store/admin/editUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { EditableUser } from "../../types/user/user";
import ConfirmModal from "../../Components/ConfirmModal";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [users, setUsers] = useState<EditableUser[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  const [modal, setShowModal] = useState(false);
  const [selectUser, setSelectUser] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responce = await axios.get(`/list-user?searchTerm=${searchTerm}`);
        setUsers(responce.data);
      } catch (error) {
        console.log(
          "Cannot get data might be some problem in fetching user",
          error
        );
      }
    };
    fetchUsers();
  }, [update, searchTerm]);

  const editUser = (index: number) => {
    const user = users[index];
    console.log(user);
    const { username, phone, email, _id, image } = user;

    dispatch(
      addUser({
        name: username!,
        phone,
        email,
        _id: _id!,
        image,
      })
    );
    navigate("/editUser");
  };

  const deletUser = async (index: number) => {
    try {
      const usr = users[index];
      await axios.delete("/deleteUser", { params: { _id: usr._id } });
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      setSearchTerm(search);
      setSearch("");
    } catch (error) {
      console.log("Cannot get data might be some problem in fetching user");
    }
  };
  return (
    <div className="bg-black min-h-screen text-white flex flex-col  items-center">
      <div className="flex gap-5 items-center">
        <input type="text" placeholder="search users..." className="border border-white my-4 rounded-md" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button className="py-1 px-4 border border-white rounded-md hover:border-2 transition-all duration-300" onClick={handleSearch}>Search</button>
      </div>
      <table className="table-auto w-full text-left border-collapse border border-gray-700">
        <thead>adminLogin
          <tr>
            <th className="border border-gray-300 px-4 py-2">Profile Pic</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: EditableUser, index: number) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={user.image || "https://via.placeholder.com/48"}
                  alt="profilepic"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
              <td>
                <div className="flex flex-row gap-1 p-1 justify-around">
                  <button
                    onClick={() => {
                      setSelectUser(index);
                      setShowModal(true);
                    }}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editUser(index)}
                    className="bg-blue-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && selectUser !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={() => {
            deletUser(selectUser);
            setShowModal(false);
            setSelectUser(null);
          }}
          onCancel={() => {
            setShowModal(false);
            setSelectUser(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
