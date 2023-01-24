import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { editcarServiceSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditCarService.css';

/* Edit Car Service Component 
   A component that add edit car service in the database*/
const EditCarService = () => {

    const navigate = useNavigate(); /* define hook to navigate to other pages */

    const storedCarService = localStorage.getItem('carService');
        if(!storedCarService) {
            navigate('*'); 
        }
    const carService = JSON.parse(storedCarService);

    const handleClickDashboard = () => {
        localStorage.removeItem('carService'); // clear local storage
        navigate('/dashboard');
    };

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(editcarServiceSchema),
        mode: "onChange"
    });

    const submitForm = async (data, e) => {
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'EditCarService',
                    treatmentNumber:      data.treatmentNumber,
                    treatmentInfo:        data.treatmentInformation,
                    dateT:                data.date,
                    workerEmail:          data.workerEmail,
                    carNumber:            data.carNumber,
                })
        };

        console.log("requesting");

        const response = await fetch('/editCarService', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Car Service Details');
            return;
        }
        const responseData = await response.json();
        console.log(responseData);
        alert('Edit Car Service Successfully')

        handleClickDashboard();
    };

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-edit-car-service-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Edit Car Service!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(submitForm)}>
                                    <div className="form-group row">
                                        {/* <div className="col-sm-6 mb-3 mb-sm-0"> */}
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentNumber"
                                                placeholder="Treatment Number" value={carService.treatmentNumber} {...register('treatmentNumber')}/>
                                            {errors.treatmentNumber ? <p className='error-msg'>{errors.treatmentNumber?.message}</p> : <br/>}
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentInformation"
                                                placeholder="Treatment Information" defaultValue={carService.treatmentInfo} {...register('treatmentInformation')}/>
                                            {errors.treatmentInformation ? <p className='error-msg'>{errors.treatmentInformation?.message}</p> : <p className='space'>{'.'}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" name="workerEmail"
                                            placeholder="Worker Email" defaultValue={carService.workerEmail} {...register('workerEmail')}/>
                                        {errors.workerEmail ? <p className='error-msg'>{errors.workerEmail?.message}</p> : <br/>}
                                    </div>
                                    <div className="form-group row">
                                        {/* <div className="col-sm-6 mb-3 mb-sm-0"> */}
                                        <div className="col-sm-6">
                                            <input type="datetime-local" name="date" className="form-control form-control-user"
                                                defaultValue={carService.dateT.toString().slice(0, -8)} {...register('date')} required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="carNumber"
                                                placeholder="Car Number" defaultValue={carService.carNumber} {...register('carNumber')}/>
                                            {errors.carNumber ? <p className='error-msg'>{errors.carNumber?.message}</p> : <p className='space'>{'.'}</p>}
                                        </div>

                                    </div>
                                    <input type="submit" className="btn btn-primary btn-user btn-block" value={'Edit Car'}></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EditCarService;