import React from 'react';
//import { forgotPasswordSchema } from 'Validations/FormsValidation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
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
        //resolver: yupResolver(forgotPasswordSchema),
        //resolver: yupResolver(resetPasswordSchema),
        mode: "onChange"
    });

    const submitForm = async (data) => {
        //add fetch to send data to backend
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'ResetPassword',
                    email:        data.email,
                    password:     data.password
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
        <div class="container">

            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Reset Password!</h1>
                                        </div>
                                        <form class="user" onSubmit={handleSubmit(submitForm)}>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>}
                                                <input type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <br/>}
                                                <input type="password" className="form-control form-control-user"
                                                    name="repeatPassword" placeholder="Repeat Password" {...register('repeatPassword')}/>
                                                {errors.repeatPassword ? <p className='error-msg'>{errors.repeatPassword?.message}</p> : <p className='space2'>{'.'}</p>}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input>
                                        </form>
                                        <hr/>
                                        <div class="text-center">
                                            <a class="small cursor-pointer" onClick={handleClickHome}>Disscare</a>
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