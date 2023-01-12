import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { signUpSchema } from 'Validations/FormsValidation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import '../../css/sb-admin-2.css';

const SignUp = () => {

    const navigate = useNavigate();

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

    const submitForm = (data) => {
        //add fetch to send data to backend
        console.log(data);
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
                                        <div className="col-sm-6 mb-3 mb-sm-0">
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
                                        <div className="col-sm-6 mb-3 mb-sm-0">
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
                                    <input type="submit" className="btn btn-primary btn-user btn-block" value={'Register Account'}></input>
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