import React, { useEffect, useState } from 'react';
import './style.css';
import { apibaseurl, callApi } from '../lib';
import ProgressBar from './ProgressBar';
import Profile from './Profile';
import UserManager from './UserManager';

import Dashboard from './Dashboard';
import SubmitLeave from './SubmitLeave';
import PendingApprovals from './PendingApprovals';
import ApprovalHistory from './ApprovalHistory';
import WorkflowDetails from './WorkflowDetails';

const Home = () => {

    const [fullname, setFullname] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const [activeComponent, setActiveComponent] = useState(null);
    const [activeMenu, setActiveMenu] = useState(1);

    useEffect(() => {

        const storedtoken = localStorage.getItem("token");

        if (!storedtoken)
            logout();
        else {

            setIsProgress(true);

            callApi(
                "GET",
                apibaseurl + "/authservice/uinfo",
                null,
                null,
                loadUinfo,
                storedtoken
            );
        }

    }, []);

    function loadUinfo(res) {

        setIsProgress(false);

        if (res.code !== 200)
            return;

        setFullname(res.fullname);
        setMenuList(res.menulist || []);

        // Load Dashboard by default
        setActiveComponent(<Dashboard />);
    }

    function logout() {

        localStorage.clear();
        window.location.replace("/");
    }

    function loadModule(module) {

        setActiveMenu(module.id);

        const componentMap = {

            1: <Dashboard />,

            2: <SubmitLeave />,

            3: <PendingApprovals />,

            4: <ApprovalHistory />,

            5: <WorkflowDetails />,

            6: <UserManager logout={logout} />,

            7: <Profile logout={logout} />

        };

        setActiveComponent(componentMap[module.id]);
    }

    function getMenuIcon(id) {

        const icons = {

            1: "/dashboard.png",
            2: "/submitleave.png",
            3: "/pending.png",
            4: "/history.png",
            5: "/workflow.png",
            6: "/users.png",
            7: "/profile.png"

        };

        return icons[id];
    }

    return (

        <div className='home'>

            <div className='home-header'>

                <div className='header-left'>

                    <img
                        src="/mainlogo.png"
                        alt=''
                        className='logo'
                    />

                    <h2 className='portal-title'>
                        Workflow Portal
                    </h2>

                </div>

                <div className='info'>

                    <span>{fullname}</span>

                    <img
                        src="/shutdown.png"
                        alt=''
                        className='logout-icon'
                        onClick={() => logout()}
                    />

                </div>

            </div>

            <div className='home-workspace'>

                <div className='home-menus'>

                    <ul>

                        {menuList.map((m) => (

                            <li
                                key={m.id}
                                className={activeMenu === m.id ? 'active' : ''}
                                onClick={() => loadModule(m)}
                            >

                                <img
                                    src={getMenuIcon(m.id)}
                                    alt=''
                                    className='menu-icon'
                                />

                                <span>
                                    {m.modulename}
                                </span>

                            </li>

                        ))}

                    </ul>

                </div>

                <div className='home-content'>

                    {activeComponent || <Dashboard />}

                </div>

            </div>

            <div className='home-footer'>
                Copyright © 2026. All rights reserved.2500032348. S MD Humera Banu
            </div>

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default Home;