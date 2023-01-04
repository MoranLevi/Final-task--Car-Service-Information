import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';

const AboutUs = () => {

    return (
        <div className='aboutUs-backgroundimg'>
            <div className='aboutUs-details-container'>
                <Card style={{width: '100%', color: 'black', background: 'rgba(192, 192, 192, 1)'}} >
                    <Card.Body>
                        <h4><b>Ort Braude - Client and Server Technologies Course 2023</b></h4>
                        <h3 style= {{color: 'black'}}>Website to manage Car Service Information</h3>
                        Submited by:
                        Yassmine Machour & Moran Levi
                    </Card.Body>
                </Card>
                <Card style={{width: '100%', color: 'black', background: 'rgba(192, 192, 192, 1)'}} >
                    <Card.Body>
                    <h4><b>What we offer?</b></h4>
                    Web application to manage car service information, such as: save, update and delete treatments date of cars that comes for treatment.
                    <br/>The number of car and worker who perfom this treatment is saved.
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AboutUs;