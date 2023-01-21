import React from 'react';
import {resetPasswordSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();


    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    const handleClickHome = () => {
        navigate('/');
    };

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onChange"
    });

    const submitForm = async (data) => {
        //add fetch to send data to backend
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:       'ResetPassword',
                    email:        data.email,
                    password:     md5(data.password)
                })
        };
        console.log("requesting");

        const response = await fetch('/resetPassword', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Updated.')

        handleClickLogIn();
    };

    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-reset-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Reset Password!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <p className='space2'>{'.'}</p>}
                                                <input type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <p className='space2'>{'.'}</p>}
                                                <input type="password" className="form-control form-control-user"
                                                    name="repeatPassword" placeholder="Repeat Password" {...register('repeatPassword')}/>
                                                {errors.repeatPassword ? <p className='error-msg'>{errors.repeatPassword?.message}</p> : <p className='space2'>{'.'}</p>}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickHome}>Disscare</a>
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

export default ResetPassword;