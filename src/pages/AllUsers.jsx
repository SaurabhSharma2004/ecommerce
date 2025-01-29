import React, { useEffect, useState } from 'react'
import { editUser, fetchAllUsers } from '../services/operations/authApi'
import {  useSelector } from "react-redux";
import moment from 'moment'

const AllUsers = () => {
  const [allUsersData, setAllUsersData] = useState([])
  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [refresh, setRefresh] = useState(false);

  const handleEditUser = (id) => {
    const userToEdit = allUsersData.find((user) => user._id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setUserDetails({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      });
      setShowConfirmModal(true);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setShowEditModal(false);
  };

  const handleProceed = () => {
    setShowConfirmModal(false);
    setShowEditModal(true);
  };

  const handleDetailsChang = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
    // api call
    
    await editUser(token, selectedUser._id, userDetails);
    setShowEditModal(false);
    setRefresh(!refresh)
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // fetch all users
      const result = await fetchAllUsers(token);
      setAllUsersData(result);
      setLoading(false);
    }
    fetchData()
  },[refresh,token])

  return (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Created At</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="px-4 py-3 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            allUsersData.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  {moment(user.createdAt).format("ll")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEditUser(user._id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure to edit user deatils?
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleProceed}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Proceed
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit modal for users */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
            <div className="space-y-4">

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userDetails.name}
                  onChange={handleDetailsChang}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={userDetails.email}
                  onChange={handleDetailsChang}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={userDetails.role}
                  onChange={handleDetailsChang}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers