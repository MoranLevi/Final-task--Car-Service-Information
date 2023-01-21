import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleClickLogIn = () => {
        navigate('/logIn');
    };

    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    const handleClickAboutUs = () => {
        navigate('/aboutUs');
    };
    
    return (
        <div id='Home' className='backgroundimg'>
            <div className='container'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <h1 className='text-center text-lg main-title'>Welcome to Car Service Information</h1>
                    <div className='buttons-container'>
                        <Button className='btn-md' onClick={handleClickAboutUs}>About Us</Button>
                        <Button className='btn-md' onClick={handleClickLogIn}>Log In</Button>
                        <Button className='btn-md' onClick={handleClickSignUp}>Sign Up</Button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;