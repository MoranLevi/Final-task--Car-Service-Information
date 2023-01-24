import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { addNewcarServiceSchema } from 'Validations/FormsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddNewCarService.css';

/* Add New Car Service Component
    A component that add new car service to the database */
const AddNewCarService = () => {
    
    const navigate = useNavigate(); /* define hook to navigate to other pages */

    /* function that navigate to the dashboard page */
    const handleClickDashboard = () => {
        navigate('/dashboard');
    };

    /* define useForm for the addNewCarService form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(addNewcarServiceSchema),
        mode: "onChange"
    });

    /* function that submit the form and send the data to the server */
    const submitForm = async (data, e) => {

        /* define the request message */
        const requestMsg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    title:     'AddNewCarService',
                    treatmentNumber:      data.treatmentNumber,
                    treatmentInformation: data.treatmentInformation,
                    date:                 data.date,
                    workerEmail:          data.workerEmail,
                    carNumber:            data.carNumber,
                })
        };

        console.log("requesting");

        /* send the request to the server */
        const response = await fetch('/addNewCarService', requestMsg)
        console.log(response);
        if (!response.ok) {
            alert('Invalid Car Service Details');
            return;
        }
        /* get the response from the server */
        const responseData = await response.json();
        console.log(responseData);
        alert('Added New Car Service Successfully')

        /* navigate to the dashboard page */
        handleClickDashboard();
    };

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-add-new-car-service-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Add a New Car Service!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(submitForm)}>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentNumber"
                                                placeholder="Treatment Number" {...register('treatmentNumber')}/>
                                            {errors.treatmentNumber ? <p className='error-msg'>{errors.treatmentNumber?.message}</p> : <br/>}
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="treatmentInformation"
                                                placeholder="Treatment Information" {...register('treatmentInformation')}/>
                                            {errors.treatmentInformation ? <p className='error-msg'>{errors.treatmentInformation?.message}</p> : <p className='space'>{'.'}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" name="workerEmail"
                                            placeholder="Worker Email" {...register('workerEmail')}/>
                                        {errors.workerEmail ? <p className='error-msg'>{errors.workerEmail?.message}</p> : <br/>}
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <input type="datetime-local" name="date" class="form-control form-control-user" {...register('date')} required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" name="carNumber"
                                                placeholder="Car Number" {...register('carNumber')}/>
                                            {errors.carNumber ? <p className='error-msg'>{errors.carNumber?.message}</p> : <p className='space'>{'.'}</p>}
                                        </div>

                                    </div>
                                    <input type="submit" className="btn btn-primary btn-user btn-block" value={'Add Car'}></input> {/* submit button */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddNewCarService;