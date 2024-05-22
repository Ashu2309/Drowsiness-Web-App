import React, { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar'
import Details from '../components/Dashboard/Details'

const Dashboard = () => {
    const [active, setActive] = useState("1")
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard