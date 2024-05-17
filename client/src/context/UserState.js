import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom"

import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_PORT;


const UserState = (props) => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUserDetails(userInfo);
        if (!userInfo) {
            navigate("/")
        }

    }, [navigate]);


    //signup user
    const signUp = async (input) => {
        try {
            const { cpassword, ...postData } = input;
            //console.log(postData)
            const response = await axios.post("/api/user", postData)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    const logIn = async (input) => {
        try {
            const response = await axios.post("/api/user/login", input)
            return response
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <UserContext.Provider
                value={{ userDetails, signUp, logIn }}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}

export default UserState