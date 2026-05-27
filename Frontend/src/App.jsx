import { useEffect, useRef, useState } from 'react';
import { imgurl, callApi, apibaseurl } from './lib';
import './components/style.css';
import ProgressBar from './components/ProgressBar.jsx';

const App = () => {

    const [isSignin, setIsSignIn] = useState(true);

    const finput = useRef();

    const [isProgress, setIsProgress] = useState(false);

    const [errorData, setErrorData] = useState({});

    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        retypepassword: ""
    });

    const [signinData, setSigninData] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {

        setTimeout(() => {
            finput.current?.focus();
        }, 100);

    }, [isSignin]);

    function switchWindow() {

        setIsSignIn(!isSignin);

        setErrorData({});

        setSigninData({
            username: "",
            password: ""
        });

        setSignupData({
            fullname: "",
            email: "",
            password: "",
            retypepassword: ""
        });
    }

    function handleSigninInput(e) {

        const { name, value } = e.target;

        setSigninData({
            ...signinData,
            [name]: value
        });
    }

    function handleSignupInput(e) {

        const { name, value } = e.target;

        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function validateSignup() {

        let errors = {};

        if (signupData.fullname.trim() === "")
            errors.fullname = true;

        if (signupData.email.trim() === "")
            errors.email = true;

        if (signupData.password.trim() === "")
            errors.password = true;

        if (
            signupData.retypepassword.trim() === "" ||
            signupData.password !== signupData.retypepassword
        )
            errors.retypepassword = true;

        setErrorData(errors);

        return Object.keys(errors).length > 0;
    }

    function validateSignin() {

        let errors = {};

        if (signinData.username.trim() === "")
            errors.username = true;

        if (signinData.password.trim() === "")
            errors.password = true;

        setErrorData(errors);

        return Object.keys(errors).length > 0;
    }

    function signin() {

        if (validateSignin())
            return;

        setIsProgress(true);

        callApi(
            "POST",
            apibaseurl + "/authservice/signin",
            signinData,
            null,
            signinResponseHandler
        );
    }

    function signup() {

        if (validateSignup())
            return;

        const sendData = {
            fullname: signupData.fullname,
            email: signupData.email,
            password: signupData.password
        };

        setIsProgress(true);

        callApi(
            "POST",
            apibaseurl + "/authservice/signup",
            sendData,
            null,
            signupResponseHandler
        );
    }

    function signinResponseHandler(res) {

        setIsProgress(false);

        if (res.code !== 200) {
            alert(res.message);
            return;
        }

        localStorage.setItem("token", res.jwt);

        window.location.replace("/home");
    }

    function signupResponseHandler(res) {

        setIsProgress(false);

        alert(res.message);

        if (res.code !== 200)
            return;

        setSignupData({
            fullname: "",
            email: "",
            password: "",
            retypepassword: ""
        });

        setIsSignIn(true);

        setTimeout(() => {
            finput.current?.focus();
        }, 100);
    }

    return (

        <div className='app'>

            <div className='container'>

                <div className='container-header'>

                    <div>
                        <label>
                            {isSignin ? "Sign In" : "Create Account"}
                        </label>
                    </div>

                   <img
                      src="/mainlogo.png"
                        alt=''
                          className='auth-logo'
                         />

                </div>

                <div className='container-content'>

                    {
                        isSignin ?

                        <>
                            <label>Email</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "user.png"}
                                    alt=''
                                />

                                <input
                                    type='text'
                                    ref={finput}
                                    autoComplete='off'
                                    placeholder='Enter email'
                                    name='username'
                                    value={signinData.username}
                                    onChange={handleSigninInput}
                                    className={errorData.username ? "error" : ""}
                                />

                            </div>

                            <label>Password</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "padlock.png"}
                                    alt=''
                                />

                                <input
                                    type='password'
                                    placeholder='Enter password'
                                    name='password'
                                    value={signinData.password}
                                    onChange={handleSigninInput}
                                    className={errorData.password ? "error" : ""}
                                />

                            </div>

                            <button onClick={signin}>
                                Login
                            </button>

                            <label
                                className='switch-text'
                                onClick={switchWindow}
                            >
                                Don’t have an account?
                                <span> Sign Up</span>
                            </label>
                        </>

                        :

                        <>
                            <label>Full Name</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "user.png"}
                                    alt=''
                                />

                                <input
                                    type='text'
                                    ref={finput}
                                    autoComplete='off'
                                    placeholder='Enter full name'
                                    name='fullname'
                                    value={signupData.fullname}
                                    onChange={handleSignupInput}
                                    className={errorData.fullname ? "error" : ""}
                                />

                            </div>

                            <label>Email</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "email.png"}
                                    alt=''
                                />

                                <input
                                    type='text'
                                    autoComplete='off'
                                    placeholder='Enter email'
                                    name='email'
                                    value={signupData.email}
                                    onChange={handleSignupInput}
                                    className={errorData.email ? "error" : ""}
                                />

                            </div>

                            <label>Password</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "padlock.png"}
                                    alt=''
                                />

                                <input
                                    type='password'
                                    placeholder='Enter password'
                                    name='password'
                                    value={signupData.password}
                                    onChange={handleSignupInput}
                                    className={errorData.password ? "error" : ""}
                                />

                            </div>

                            <label>Confirm Password</label>

                            <div className='input-group'>

                                <img
                                    src={imgurl + "padlock.png"}
                                    alt=''
                                />

                                <input
                                    type='password'
                                    placeholder='Re-enter password'
                                    name='retypepassword'
                                    value={signupData.retypepassword}
                                    onChange={handleSignupInput}
                                    className={errorData.retypepassword ? "error" : ""}
                                />

                            </div>

                            <button onClick={signup}>
                                Register
                            </button>

                            <label
                                className='switch-text'
                                onClick={switchWindow}
                            >
                                Already have an account?
                                <span> Sign In</span>
                            </label>
                        </>
                    }

                </div>

                <div className='container-footer'>
                    Copyright © 2026. All rights reserved.
                </div>

            </div>

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default App;