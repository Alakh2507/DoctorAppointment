import { createContext, useEffect, useState } from "react";
// import { doctors } from '../assets/assets_frontend/assets.js'
import axios from 'axios'
export const StoreContext = createContext(null);
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const StoreContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [doctors, setDoctorList] = useState([])
  //profileImage
  const [profile, setProfile] = useState("")

  const navigate = useNavigate();

useEffect(() => {

  if (token) {

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        // token expired

        localStorage.removeItem("userToken");
        setToken(null);

        navigate("/doctor-login");

      }

    } catch (error) {
      localStorage.removeItem("userToken");
      setToken(null);
      navigate("/doctor-login");
    }

  }

}, [token]);


  const getDoctorsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/list`)
      if (response.data.success) {
        setDoctorList(response.data.doctorlist)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Server problem")
    }
  }


   //profile update
  const [image, setImage] = useState("")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: ""
    },
    gender: "",
    dob: '',
  })
  
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/userprofile`, { headers: { Authorization: `Bearer ${token}` } },)
      if (response.data.success) {
        setUserData(response.data.userData)
        setImage(response.data.userData.image)
        setProfile(response.data.userData.image)
      }
    } catch (error) {
      {token&&toast.error(error.response?.data?.message)}
    }
  }




  useEffect(() => {
    getDoctorsData()
    getUserData()
  }, [token])


  const contextValue = {
    token,
    setToken,
    doctors,
    backendUrl,
    profile,
    setProfile, image, setImage,
    userData, setUserData,
    getUserData
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
