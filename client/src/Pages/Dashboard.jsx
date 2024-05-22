import React, { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar'
import Details from '../components/Dashboard/Details'
import Profile from '../components/Dashboard/Profile'
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const [active, setActive] = useState("1")
    const navigate = useNavigate()
    return (
        <>
            <div className="container_fluid">
                <div className="d-flex">
                    <div className='leftBlockCreate'>
                        <SideBar active={active} setActive={setActive} />
                    </div>
                    <div className='fillDetails'>
                        {active === "1" &&
                            <Details />
                        }
                        {active === "2" &&
                            <Profile />
                        }
                        {active === "3" && (
                            <>
                                {localStorage.removeItem("userInfo")}
                                {navigate("/")}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard