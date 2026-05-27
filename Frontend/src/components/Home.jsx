import React, { useEffect, useState } from 'react';
import './style.css';
import { apibaseurl, callApi } from '../lib';
import ProgressBar from './ProgressBar';
import Profile from './Profile';
import UserManager from './UserManager';

const Home = () => {

    const [fullname, setFullname] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const [activeComponent, setActiveComponent] = useState(null);
    const [activeMenu, setActiveMenu] = useState(0);

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
    }

    function logout() {

        localStorage.clear();

        window.location.replace("/");
    }

    function loadModule(module) {

        setActiveMenu(module.id);

        const componentMap = {

            1: <h2>Dashboard Module</h2>,

            2: <h2>Submit Leave Module</h2>,

            3: <h2>Pending Approvals Module</h2>,

            4: <h2>Approval History Module</h2>,

            5: <h2>Workflow Details Module</h2>,

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

                    {activeComponent ||

                        <div className='welcome-box'>

                            <img
                                src="/mainlogo.png"
                                alt=''
                                className='welcome-logo'
                            />

                            <h1>
                                Welcome to Workflow Portal
                            </h1>

                            <p>
                                Manage approvals, leaves, workflow and users easily.
                            </p>

                        </div>

                    }

                </div>

            </div>

            <div className='home-footer'>
                Copyright © 2026. All rights reserved.
            </div>

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default Home;