import React from 'react'
import { FaHome, FaProjectDiagram, FaBusinessTime, FaGraduationCap } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { RiPaintFill } from "react-icons/ri";

const SideBar = ({ active, setActive }) => {

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
    return (
        <div className='side_nav' onMouseEnter={() => toggleSideBar(0)} onMouseLeave={() => toggleSideBar(1)}>
            <div className='side_child'>
                <ul>
                    <div className='sidebar_label'><li className={active === "1" ? "active" : ""} onClick={() => setActive("1")}><FaHome /><p>Dashboard</p></li><span></span></div>

                    <div className="sidebar_label">

                        <li className={active === "About" ? "active" : ""} onClick={() => setActive("About")}><FaCircleInfo /><p>AboutUs</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "Skills" ? "active" : ""} onClick={() => setActive("Skills")}><GiSkills /><p>Skills</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "Project" ? "active" : ""} onClick={() => setActive("Project")}><FaProjectDiagram /><p>Project</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "Experience" ? "active" : ""} onClick={() => setActive("Experience")}><FaBusinessTime /><p>Expereince</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "Education" ? "active" : ""} onClick={() => setActive("Education")}><FaGraduationCap /><p>Education</p></li><span></span>
                    </div>
                    <div className="sidebar_label">

                        <li className={active === "Theme" ? "active" : ""} onClick={() => setActive("Theme")}><RiPaintFill /><p>Theme</p></li>
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default SideBar
