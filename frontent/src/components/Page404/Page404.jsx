import React from 'react';
// import lego-man-image from "../../images/404-lego-man-image.png";
import imageLego from '../../images/404-lego-man-image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Page404.css';

const Page404 = () => {
    
    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center row">
                    <div className=" col-md-6">
                        <img src={imageLego} alt='imageLego' className="img-fluid"/>
                    </div>
                    <div className=" col-md-6 mt-5">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                        <p className="lead">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>

                </div>
            </div>
        </div>    
    );
};

export default Page404;