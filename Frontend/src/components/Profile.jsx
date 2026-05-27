import React, { useEffect, useState } from 'react';
import './style.css';
import ProgressBar from './ProgressBar';
import { apibaseurl, callApi, imgurl } from '../lib';

const Profile = ({ logout }) => {

    const [data, setData] = useState(null);
    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            logout();
            return;
        }

        setIsProgress(true);

        callApi(
            "GET",
            apibaseurl + "/authservice/profile",
            null,
            null,
            profileResponse,
            token
        );

    }, []);

    function profileResponse(res) {

        console.log("PROFILE RESPONSE =", res);

        setIsProgress(false);

        if (res.code !== 200) {
            alert(res.message);
            return;
        }

        setData(res);
    }

    if (!data)
        return null;

    const userInfo = data.user[0];
    const roleInfo = data.user[1];

    return (
        <div className='profile'>

            <div className='profile-card'>

                <div className='profile-top'>

                    <img
                        src={imgurl + "user.png"}
                        alt=''
                    />

                    <div>
                        <h2>{userInfo.fullname}</h2>
                        <p>{roleInfo.rolename}</p>
                    </div>

                </div>

                <div className='profile-details'>

                    <div className='profile-row'>
                        <span>Name</span>
                        <strong>{userInfo.fullname}</strong>
                    </div>

                    <div className='profile-row'>
                        <span>Email</span>
                        <strong>{userInfo.email}</strong>
                    </div>

                    <div className='profile-row'>
                        <span>Role</span>
                        <strong>{roleInfo.rolename}</strong>
                    </div>

                    <div className='profile-row'>
                        <span>Status</span>
                        <strong>
                            {userInfo.status === 1 ? "Active" : "Inactive"}
                        </strong>
                    </div>

                </div>

            </div>

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default Profile;