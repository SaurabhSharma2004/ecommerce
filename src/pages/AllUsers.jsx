import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../services/operations/authApi'
import {  useSelector } from "react-redux";

const AllUsers = () => {
  const [allUsersData, setAllUsersData] = useState([])
  const [loading, setLoading] = useState(false)
  
  const { token } = useSelector((state) => state.auth);
  // console.log("token", token);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // fetch all users
      const result = await fetchAllUsers(token);
      setAllUsersData(result);
      setLoading(false);
    }
    fetchData()
  },[])

  console.log("console.log(allUsersData)", allUsersData);

  return (
    <div>AllUsers</div>
  )
}

export default AllUsers