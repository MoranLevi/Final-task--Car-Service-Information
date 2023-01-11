import React from 'react';
import { logInSchema } from 'Validations/FormsValidation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const navigate = useNavigate();

    const handleClickForgotPassword = () => {
        navigate('/forgotPassword');
    };

    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    const handleClickHome = () => {
        navigate('/');
    };
    
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(logInSchema),
        mode: "onChange"
    });

    const submitForm = (data) => {
        //add fetch to send data to backend
        console.log(data);
        handleClickHome();
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
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                <p className='error-msg'>{errors.email ? errors.email?.message : ' '}</p>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                <p className='error-msg'>{errors.password ? errors.password?.message : ' '}</p>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                    <label className="custom-control-label remember-me-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            {/* <a className="btn btn-primary btn-user btn-block" onClick={handleClickHome}>
                                                Login
                                            </a> */}
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
    </div>
    );
};

export default LogIn;