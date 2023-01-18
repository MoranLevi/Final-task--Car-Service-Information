import React from 'react';
import { forgotPasswordSchema } from 'Validations/FormsValidation';
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
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p className="mb-4 forgot-password-data-label">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(submitForm)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>
                                                    {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>}
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-user btn-block" value={'Reset Password'}></input>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickSignUp}>Create an Account!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small cursor-pointer" onClick={handleClickLogIn}>Already have an account? Login!</a>
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