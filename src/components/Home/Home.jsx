import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import './Home.css';
import info from "../../images/info.png";
import login from "../../images/login.png";
import register from "../../images/register.png";



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
                <center><h1 className='centered'>Welcome to car service business.</h1></center>
                <center>
                <div className='HomeContainer'>
                    <div>
                        <img className="icons" src={info}/>
                        <img className="icons" src={login}/>
                        <img className="icons" src={register}/>
                    </div>
                    <div>
                        <button type="button"  onClick={handleClickLogIn}>About us</button>
                        <button type="button"  onClick={handleClickLogIn}>Log In</button>
                        <button type="button"  onClick={handleClickSignUp}>Sign Up</button>
                    </div>
                </div>
                </center>
            </div>   
        </div>
    );
};

export default Home;