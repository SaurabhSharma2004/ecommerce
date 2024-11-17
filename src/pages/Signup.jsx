import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>

        {/* Profile Picture Upload and Preview */}
        <div className="flex flex-col items-center mb-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
          <label className="text-blue-500 hover:underline cursor-pointer">
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            Upload Profile Picture
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          {/* Email Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          {/* Password Field */}
          <div className="flex items-center border-b border-gray-300 py-2 relative">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-0 cursor-pointer text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Confirm Password Field */}
          <div className="flex items-center border-b border-gray-300 py-2 relative">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none text-gray-700"
              required
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-0 cursor-pointer text-gray-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;