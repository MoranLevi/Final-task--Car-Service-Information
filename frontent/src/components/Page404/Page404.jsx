import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Page404.css';

const Page404 = () => {
    
    return (
        <div className="container">
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p class="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <a href="/login" class="btn btn-primary">Go Home</a>
                </div>
            </div>
        </div> 
    );
};

export default Page404;