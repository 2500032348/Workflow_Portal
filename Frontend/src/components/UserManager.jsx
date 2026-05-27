import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import ProgressBar from './ProgressBar';
import { apibaseurl, callApi, imgurl } from '../lib';

const UserManager = ({ logout }) => {

    const [data, setData] = useState(null);
    const [token, setToken] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const contentDiv = useRef();
    const fname = useRef();

    const [userData, setUserData] = useState(null);
    const [errorData, setErrorData] = useState({});
    const [rolesData, setRolesData] = useState([]);

    useEffect(() => {

        const storedtoken = localStorage.getItem("token");

        if (!storedtoken)
            return logout();

        setToken(storedtoken);

        const ps = 10;

        loadUsers(1, ps, storedtoken);

    }, []);

    function loadUsers(page, size, tok = token) {

        setIsProgress(true);

        setActivePage(page - 1);

        callApi(
            "GET",
            apibaseurl + "/authservice/getallusers/" + page + "/" + size,
            null,
            null,
            loadData,
            tok
        );
    }

    function loadData(res) {

        console.log("GET USERS =", res);

        setIsProgress(false);

        if (res.code !== 200) {
            alert(res.message);
            return;
        }

        setData(res);

        if (res.roles)
            setRolesData(res.roles);
    }

    function handleInput(e) {

        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    }

    function addUser() {

        setErrorData({});

        setUserData({
            id: "",
            fullname: "",
            email: "",
            password: "",
            role: 1,
            status: 1
        });

        setShowPopup(true);

        setTimeout(() => {
            fname.current?.focus();
        }, 100);
    }

    function editUser(id) {

        setIsProgress(true);

        callApi(
            "GET",
            apibaseurl + "/authservice/getuser/" + id,
            null,
            null,
            editUserHandler,
            token
        );
    }

    function editUserHandler(res) {

        setIsProgress(false);

        if (res.code !== 200) {
            alert(res.message);
            return;
        }

        setUserData(res.user);

        setShowPopup(true);

        setTimeout(() => {
            fname.current?.focus();
        }, 100);
    }

    function deleteUser(id) {

        const confirmDelete = confirm("Delete this user?");

        if (!confirmDelete)
            return;

        setIsProgress(true);

        callApi(
            "DELETE",
            apibaseurl + "/authservice/deleteuser/" + id,
            null,
            null,
            deleteUserHandler,
            token
        );
    }

    function deleteUserHandler(res) {

        setIsProgress(false);

        alert(res.message);

        loadUsers(activePage + 1, 10);
    }

    function validateData() {

        let errors = {};

        if (!userData.fullname)
            errors.fullname = true;

        if (!userData.email)
            errors.email = true;

        if (!userData.password)
            errors.password = true;

        setErrorData(errors);

        return Object.keys(errors).length > 0;
    }

    function saveUser() {

        if (validateData())
            return;

        setIsProgress(true);

        if (userData.id === "") {

            callApi(
                "POST",
                apibaseurl + "/authservice/saveuser",
                userData,
                null,
                saveUserHandler,
                token
            );

        } else {

            callApi(
                "PUT",
                apibaseurl + "/authservice/updateuser/" + userData.id,
                userData,
                null,
                saveUserHandler,
                token
            );
        }
    }

    function saveUserHandler(res) {

        setIsProgress(false);

        alert(res.message);

        if (res.code !== 200)
            return;

        setShowPopup(false);

        loadUsers(activePage + 1, 10);
    }

    return (

        <div className='umanager'>

            <div className='umanager-header'>
                <label>User Manager</label>

                <button onClick={addUser}>
                    Add User
                </button>
            </div>

            <div className='umanager-content' ref={contentDiv}>

                <table>

                    <thead>
                        <tr>
                            <th>S#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data?.users?.map((user, index) => (

                            <tr key={user.id}>

                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    {user.fullname}
                                </td>

                                <td>
                                    {user.email}
                                </td>
<td>

    <img
        src="/edit.png"
        alt=''
        className='action-icon'
        onClick={() => editUser(user.id)}
    />

    <img
        src="/delete.png"
        alt=''
        className='action-icon'
        onClick={() => deleteUser(user.id)}
    />

</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className='umanager-footer'>

                <div className='pages'>

                    {
                        Array.from(
                            { length: data?.totalpages || 0 },
                            (_, index) => (

                                <label
                                    key={index}
                                    className={index === activePage ? 'active' : ''}
                                    onClick={() => loadUsers(index + 1, 10)}
                                >
                                    {index + 1}
                                </label>
                            )
                        )
                    }

                </div>

            </div>

            {
                showPopup &&

                <div className='overlay'>

                    <div className='popup'>

                        <span
                            className='close'
                            onClick={() => setShowPopup(false)}
                        >
                            &times;
                        </span>

                        <h3>
                            {userData?.id === "" ? "New User" : "Update User"}
                        </h3>

                        <label>Full Name*</label>

                        <input
                            type='text'
                            ref={fname}
                            name='fullname'
                            value={userData?.fullname}
                            onChange={handleInput}
                            className={errorData.fullname ? 'error' : ''}
                        />

                        <label>Email*</label>

                        <input
                            type='text'
                            name='email'
                            value={userData?.email}
                            onChange={handleInput}
                            className={errorData.email ? 'error' : ''}
                        />

                        <label>Password*</label>

                        <input
                            type='password'
                            name='password'
                            value={userData?.password}
                            onChange={handleInput}
                            className={errorData.password ? 'error' : ''}
                        />

                        <button onClick={saveUser}>
                            {userData?.id === "" ? "Save" : "Update"}
                        </button>

                    </div>

                </div>
            }

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default UserManager;