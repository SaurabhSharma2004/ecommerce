import React, { useState } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authApi";

export const Header = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // console.log("conslonging the user", user);
  return (
    // console.log("conslonging the user", user)
    <header className={"h-16 shadow-md bg-white"}>
      <div
        className={
          "container mx-auto h-full flex items-center px-4 justify-between"
        }
      >
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div
          className={
            "hidden lg:flex items-center w-full max-w-sm rounded-full border border-gray-300 focus-within:shadow-lg pl-4 pr-2 bg-white"
          }
        >
          <input
            type={"text"}
            placeholder={"Search items here..."}
            className={
              "w-full outline-none py-2 text-gray-700 placeholder-gray-500"
            }
          />
          <button
            className={
              "text-xl h-10 w-10 flex justify-center items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            }
          >
            <CiSearch />
          </button>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center items-center" onClick={() => setOpen(!open)}>
            <div className={"text-2xl cursor-pointer"}>
              {user ? (
                <img
                  src={user?.profilePicture}
                  alt=''
                  loading="lazy"
                  className="aspect-square rounded-full object-cover w-[30px]"
                />
              ) : (
                <Link to={"/sign-up"}>
                  <FaRegCircleUser />
                </Link>
              )}
            </div>

            {open && user?.role === 'Admin' && (
              <div className=" absolute bottom-0 top-9 h-fit p-2 bg-slate-100 shadow-lg rounded-lg">
                <nav>
                  <Link className="whitespace-nowrap" to="/admin-panel/all-products">
                    Admin panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
              <div className="bg-red-600 text-sm flex items-center justify-center h-5 rounded-full w-5 absolute -top-3 -right-3">
                <p>0</p>
              </div>
            </span>
          </div>

          <div>
            {user ? (
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
