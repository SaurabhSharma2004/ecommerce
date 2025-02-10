import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { uploadProduct } from "../services/operations/productApi";

const AllProducts = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    sellingPrice: "",
    description: "",
    productImage: [],
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleUploadImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Generate local previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]); // Store files to send to backend
    setImagePreviews((prev) => [...prev, ...newPreviews]); // Store preview URLs
  };

  // Remove Image from List
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const submitHandle = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // Create FormData object to send as multipart/form-data
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("brandName", data.brandName);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("sellingPrice", data.sellingPrice);
    formData.append("description", data.description);

    images.forEach((image) => formData.append("productImage", image));

    // Upload product with images
    const response = await uploadProduct(formData, token);
    console.log("UPLOAD_PRODUCT_API_RESPONSE", response);
  };

  console.log("Printing the data", data);

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

      {openUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Product
              </h2>
              <button
                onClick={() => setOpenUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <form
              className="gap-4 max-h-[70vh] overflow-y-auto px-2 py-4 w-full "
              onSubmit={submitHandle}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={data.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={data.brandName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Category</option>
                  {productCategory.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image
                </label>
                <label htmlFor="uploadImage">
                  <div className="border w-full rounded h-32 bg-slate-100 p-2 flex items-center justify-center cursor-pointer">
                    <div className="flex items-center justify-center flex-col ">
                      <FaCloudUploadAlt className="text-4xl text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Upload Product Image
                      </p>
                      <input
                        type="file"
                        name="uploadImage"
                        id="uploadImage"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadImage}
                      />
                    </div>
                  </div>
                </label>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MdClose size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="sellingPrice"
                >
                  Selling Price
                </label>
                <input
                  type="text"
                  name="sellingPrice"
                  id="sellingPrice"
                  value={data.sellingPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm mt-4"
              >
                Upload Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
