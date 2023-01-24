import React, { useRef, useState, useEffect } from 'react';
import { logInSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import md5 from 'md5';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogIn.css';

import Popup from 'reactjs-popup';
import { Modal, Button } from "react-bootstrap";


const LogIn = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(0);
    const [showModal, setShow] = useState(false);
    const [msgModal, setMsgModal] = useState('');
    const captchaRef = useRef(null); 

    useEffect(() => {
        // Check for a stored session in local storage
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
            // If the session is stored, fill in the username and password
            const session = JSON.parse(storedSession);
            if(session.rememberMe)
            {
		        // navigate('/signUp');
                navigate('/dashboard');
            }
        }
      }, []); // Only run this effect once
      

    const handleClose = () =>{
         setShow(false);
         setMsgModal('');
    }
    const handleShow = () => setShow(true);

    const handleClickForgotPassword = () => {
        navigate('/forgotPassword');
    };

    const handleClickSignUp = () => {
        navigate('/signUp');
    };
    

    const handleClickDashboard = () => {
        navigate('/dashboard');
    };
    
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(logInSchema),
        mode: "onChange"
    });

    const submitForm = async (data, e) => {
		const storedSession = localStorage.getItem('session');
        e.preventDefault();
        if (storedSession){
            // navigate('/signUp');
            navigate('/dashboard');
        }
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        const reCAPTCHMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'reCAPTCHA',
                    token:     token
                })
        };
        
        console.log("requesting");

        const reCaptchaResponse = await fetch('/reCaptchaValidation', reCAPTCHMsg)
        console.log(reCaptchaResponse);
        if (!reCaptchaResponse.ok) {
            setMsgModal('ReCAPTCHA verification failed')
           handleShow()
            //alert('ReCAPTCHA verification failed');
            return;
        }

        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'LogIn',
                    email: data.email,
                    password: md5(data.password),
                })
        };

        console.log("requesting");

        const response = await fetch('/logIn', requestMsg);
        
        if (!response.ok) {
            setMsgModal('Invalid Login Details')
           handleShow()
            //alert('Invalid Login Details');
            localStorage.clear();
            return;
        }
        let responseData = await response.json();
        responseData = JSON.parse(responseData.body);
        console.log(responseData)

        if (rememberMe) {
            localStorage.setItem('session', JSON.stringify({rememberMe}));
        } 
        console.log(data);

        // handleClickHome();
        localStorage.setItem('connected', JSON.stringify(true)); // Set the connected state to true
        localStorage.setItem('user', JSON.stringify(responseData)); // Set the user data in local storage
        handleClickDashboard();
    };
    
    return (
        
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-3">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input id="email" type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>}
                                            </div>
                                            <div className="form-group">
                                                <input id="password" type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <br/>}
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)}/>
                                                    <label className="custom-control-label remember-me-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <center className='margin-bottom-ReCAPTCHA'><ReCAPTCHA
                                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                                ref={captchaRef}
                                            /></center>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Login'}></input>
                                            <hr/>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickForgotPassword}>Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickSignUp}>Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='msg-modal-title'>ALERT!</Modal.Title>
                </Modal.Header>
                <Modal.Body><p className='msg-modal'>{msgModal}</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
    </div>
    );
};

export default LogIn;