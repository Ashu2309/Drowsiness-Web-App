import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import React, { useEffect, useState } from 'react'
import { FaHome, FaProjectDiagram, FaBusinessTime, FaGraduationCap } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { RiPaintFill } from "react-icons/ri";
import { Avatar } from "@chakra-ui/react";

const SideBar = ({ active, setActive }) => {

    const [userInfo, setUserInfo] = useState("");

    //console.log(active)
    const toggleSideBar = (event) => {
        const pTags = document.querySelectorAll(".sidebar_label p");
        pTags.forEach(p => {
            if (event === 0)
                p.style.display = "block";
            else
                p.style.display = "none";

        });
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(userInfo)
    }, [])

    return (
        <div className='side_nav' onMouseEnter={() => toggleSideBar(0)} onMouseLeave={() => toggleSideBar(1)}>
            <div className='side_child'>
                <ul>
                    <div className='sidebar_label'><li className={active === "1" ? "active" : ""} onClick={() => setActive("1")}><FaHome /><p>Dashboard</p></li><span></span></div>

                    <div className="sidebar_label">

                        <li className={active === "2" ? "active" : ""} onClick={() => setActive("2")}><Avatar src={userInfo?.pic} border="3px solid lightgreen"></Avatar><p>Profile</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "3" ? "active" : ""} onClick={() => setActive("3")}><FiLogOut /><p>Logout</p></li><span></span>
                    </div>


                </ul>
            </div>
        </div>
    )
}

export default SideBar
