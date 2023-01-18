import React, { useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { signUpSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { md5 } from 'md5';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import '../../css/sb-admin-2.css';

const SignUp = () => {

    const navigate = useNavigate();

    const captchaRef = useRef(null);
    
    const handleClickHome = () => {
        navigate('/');
    };

    const handleClickLogIn = () => {
        navigate('/logIn');
    };
    
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(signUpSchema),
        mode: "onChange"
    });

    const submitForm = async (data, e) => {
        e.preventDefault();
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
            alert('ReCAPTCHA verification failed');
            return;
        }

        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'SignUp',
                    email:     data.email,
                    firstName: data.firstName,
                    lastName:  data.lastName,
                    password:  md5(data.password),
                    connected: false
                })
        };

        console.log("requesting");

        const response = await fetch('/signUp', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Registration Details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Registered! Please login.')

        handleClickHome();
    };
    
    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(submitForm)}>
                                    <div className="form-group row">
                                        {/* <div className="col-sm-6 mb-3 mb-sm-0"> */}
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="firstName"
                                                placeholder="First Name" {...register('firstName')}/>
                                            {errors.firstName ? <p className='error-msg'>{errors.firstName?.message}</p> : <br/>}
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="lastName"
                                                placeholder="Last Name" {...register('lastName')}/>
                                            {errors.lastName ? <p className='error-msg'>{errors.lastName?.message}</p> : <p className='space'>{'.'}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" name="email"
                                            placeholder="Email Address" {...register('email')}/>
                                        {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>}
                                    </div>
                                    <div className="form-group row">
                                        {/* <div className="col-sm-6 mb-3 mb-sm-0"> */}
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                name="password" placeholder="Password" {...register('password')}/>
                                            {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <br/>}
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                name="repeatPassword" placeholder="Repeat Password" {...register('repeatPassword')}/>
                                            {errors.repeatPassword ? <p className='error-msg'>{errors.repeatPassword?.message}</p> : <p className='space2'>{'.'}</p>}
                                        </div>
                                    </div>
                                    <center className='margin-bottom-ReCAPTCHA'><ReCAPTCHA
                                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                        ref={captchaRef}
                                    /></center>
                                    <input type="submit" className="btn btn-primary btn-user btn-block" value={'Register Account'}></input>
                                    {/* <input type="submit" className="btn btn-primary btn-user btn-block" value={'Register Account'} disabled={!isReCAPTCHVerified}></input> */}
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <a className="small cursor-pointer" onClick={handleClickLogIn}>Already have an account? Login!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;