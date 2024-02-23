/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom"
import Login from "./components/pages/Login";
import Register from "./components/pages/Register"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./components/utility/userDataSlice";
import axios from "axios";
import NewFormPage from "./components/pages/Form";
import Calendar from "./components/pages/Calendar";
import EditSchedulePage from "./components/pages/EditSchedule";

function App() {
  const dispatch = useDispatch();

  async function getUser(token: string) {
    try {
        const response = await axios.get('http://localhost:8080/api/users', {
            headers: {
                Authorization: token
            }
        })

        dispatch(setUserData(response.data))
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
    }
}

useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        getUser(token)
    } 
}, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Calendar /> } />
        <Route path="/schedules" element={<EditSchedulePage /> } />
        <Route path="/form" element={<NewFormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
