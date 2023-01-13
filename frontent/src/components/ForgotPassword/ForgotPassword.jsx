import React from 'react';
import { forgotPasswordSchema } from 'Validations/FormsValidation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    const handleClickHome = () => {
        navigate('/');
    };

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "onChange"
    });

    const submitForm = async (data) => {
        //add fetch to send data to backend
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'ForgotPassword',
                    email:     data.email
                })
        };
        console.log("requesting");

        const response = await fetch('/forgotPassword', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Sent! Check your mail.')

        handleClickHome();
    };

    return (
        <div class="container">

            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p class="mb-4 forgot-password-data-label">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form class="user" onSubmit={handleSubmit(submitForm)}>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                    {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input>
                                        </form>
                                        <hr/>
                                        <div class="text-center">
                                            <a class="small cursor-pointer" onClick={handleClickSignUp}>Create an Account!</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small cursor-pointer" onClick={handleClickLogIn}>Already have an account? Login!</a>
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

export default ForgotPassword;