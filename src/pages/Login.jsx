import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginIcon from '../assest/signin.gif'
import { NavLink } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const submitHandle = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        
        <div className="bg-white rounded w-full max-w-md mx-auto p-2">
          <div className="h-10 w-10 mx-auto">
            <img src={LoginIcon} alt="login-img" />
          </div>
        </div>

        <div className="bg-white rounded w-full max-w-md mx-auto p-2">
          <h1 className="text-center text-2xl font-bold">Login</h1>
          <form className="space-y-4" onSubmit={submitHandle}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>

              <NavLink to={'/forgot-password'} className='block w-fit ml-auto hover:underline'>
                Forgot Password
              </NavLink>

            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
