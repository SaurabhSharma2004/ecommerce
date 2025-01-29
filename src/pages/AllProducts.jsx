import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
const AllProducts = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    price: '',
    description: '',
    productImage: '',
    selling: ''
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

    
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setOpenUploadModal(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Upload Product Modal */}
      {openUploadModal && (
        <div
          class
          name="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Product
              </h2>
              <button
                onClick={() => setOpenUploadModal(!openUploadModal)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MdClose />
              </button>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={data.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts