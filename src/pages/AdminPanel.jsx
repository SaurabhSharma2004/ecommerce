import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {
    const {user} = useSelector(state => state.profile)
  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="w-full max-w-[250px] bg-white min-h-full">
        <div className="h-32 flex items-center justify-center flex-col">
          <div className="flex items-center justify-center">
            {user ? (
              <img
                src={user?.profilePicture}
                alt={user.name.substring(0, 2)}
                loading="lazy"
                className="aspect-square rounded-full object-cover w-[60px]"
              />
            ) : (
              <Link to="/sign-up">
                <FaRegCircleUser />
              </Link>
            )}
          </div>
          <div className="font-semibold text-lg capitalize">{user?.name}</div>
        </div>

        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-2'><Outlet/></main>
    </div>
  );
}

export default AdminPanel