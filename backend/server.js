const mysql = require('mysql')
const express = require('express')
const cors = require('cors');
const nodemailer =require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv').config()
const { USERS_TABLE, CARS_TABLE } = require('./DatabaseTables')

const app = express()
const port =  process.env.PORT || 8000

app.use(express.json());
app.use(cors());

const db_config = {
    user: "admin1",
    host: "carservicedb.cj9a9lermuhv.us-east-1.rds.amazonaws.com",
    password: "12345678",
    database: "sys",
};

let databaseConnection

// Create connection to mySql
function handleDisconnect() {
    databaseConnection = mysql.createConnection(db_config)

    // The server is either down or restarting (takes a while sometimes).
    databaseConnection.connect((err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            // We introduce a delay before attempting to reconnect, to avoid a hot loop, and to allow our node script to process asynchronous requests in the meantime.
            // If you're also serving http, display a 503 error.
            setTimeout(handleDisconnect, 2000);
        }
    });

    databaseConnection.on('error', (err) => { // sign a function to error event
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
            // Connection to the MySQL server is usually lost due to either server restart, 
            // or a connnection idle timeout (the wait_timeout server variable configures this)
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.post('/logIn', (req, res) => {
    console.log("POST login")

    if (req.body.title !== "LogIn") {
        res.status(400)
        res.send("Bad Login Request.")
        return
    }

    const query = `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ? AND ${USERS_TABLE.columns.password} = ?`
    databaseConnection.query(query, [req.body.email, req.body.password],
        (err, result) => {
            if (err) {
                res.status(500)//Internal server error
                res.send(err)
                return
            }

            if (result.length === 0) {
                res.status(400)//bad request
                res.send("Invalid login parameters.")
                return
            }

            const resMsg = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        title: 'LogIn',
                        loginResult: 'OK',
                        firstName: result[0].firstName,
                        lastName:  result[0].lastName,
                    })
            }
            res.type('application/json')
            res.send(resMsg)
        })
})

app.post('/signUp', (req, res) => {
    console.log("POST Sign-Up")

    if (req.body.title !== "SignUp") {
        res.status(400)
        res.send("Bad Request.")
        return
    }

    /* Check if user already exist */
    const query = `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ?`
    databaseConnection.query(query, [req.body.email],
        (err, result) => {
            if (err) {
                res.status(500)
                res.send(err)
                return
            }
            if (result.length !== 0) {
                res.status(400)
                res.send("Email already exists")
                return
            }

            /* Insert new user */
            let query = `INSERT INTO ${USERS_TABLE.name} VALUES ('${req.body.email}','${req.body.firstName}', '${req.body.lastName}', '${req.body.password}')`
            console.log(query)
            databaseConnection.query(query,
                (err, result) => {
                    if (err) {
                        res.status(500)
                        res.send(err)
                        throw err
                    }

                    if (result.length === 0) {
                        res.status(400)
                        res.send("Invalid login parameters.")
                        return
                    }

                    const signUpMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'signUp',
                                signUpResult: 'OK',
                            })
                    }

                    res.type('application/json')
                    res.send(signUpMsg)
                })
        })
})

app.post('/forgotPassword', (req, res) => {
    console.log("POST Forgot")

    if (req.body.title !== "ForgotPassword") {
        res.status(400)
        res.send("Bad Request.")
        return
    }

    /* Check if user already exist */
    const query = `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ?`
    databaseConnection.query(query, [req.body.email],
        (err, result) => {
            if (err) {
                res.status(500)
                res.send(err)
                return
            }
            if (result.length == 0) {
                res.status(400)
                console.log("125")
                res.send("Email DOESN'T exists")
                return
            }

            let transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'yassmineMoran@hotmail.com',
                    pass: 'ClientServer'
                },
                tls : { rejectUnauthorized: false }
            });

            let mailOptions ={
                from:'yassmineMoran@hotmail.com',
                to: req.body.email,
                subject: 'Reset Password',
                text: 'Hello,\nEnter the following link to reset password:\nhttp://localhost:3000/#/resetPassword'
            };

            transporter.sendMail(mailOptions, function(err,info){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("sent: "+info.response);
            })

            const forgotPasswordMsg = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                {
                    title: 'forgotPasswordMsg',
                    signUpResult: 'OK',
                })
            }

            res.type('application/json')
            res.send(forgotPasswordMsg)
        })
})

app.post('/resetPassword', (req, res) => {
    console.log("POST resetPassword")

    if (req.body.title !== "ResetPassword") {
        res.status(400)
        res.send("Bad Reset Password Request.")
        return
    }

    //const query = `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ? AND ${USERS_TABLE.columns.password} = ?`
    const query = `UPDATE ${USERS_TABLE.name} SET ${USERS_TABLE.columns.password} = ? WHERE ${USERS_TABLE.columns.email} = ?`
    databaseConnection.query(query, [req.body.password,req.body.email],
        (err, result) => {
            if (err) {
                res.status(500)//Internal server error
                res.send(err)
                return
            }

            if (result.affectedRows === 0) {
                res.status(400)//bad request
                
                res.send("Invalid email parameters.")
                return
            }

            const resetPasswordMsg = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        title: 'resetPassword',
                        resetPasswordResult: 'OK',
                    })
            }
            res.type('application/json')
            res.send(resetPasswordMsg)
        })
})

app.post('/reCaptchaValidation', async (req, res) => {
    console.log("POST reCAPTCHA")

    if (req.body.title !== "reCAPTCHA") {
        res.status(400)
        res.send("Bad Login Request.")
        return
    }

    //Destructuring response token from request body
    const token = req.body.token;

    await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (res.status(200)) {
        console.log('reCAPTCHA verification succeeded');
        const reCAPTCHAMsg = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                title: 'reCAPTCHA',
                signUpResult: 'OK',
            })
        }
        res.type('application/json')
        res.send(reCAPTCHAMsg)
        return
    }else{
        console.log('reCAPTCHA verification failed');
        res.status(400)
        res.send("ReCAPTCHA verification failed")
        return
    }

    // await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `secret=${secret_key}&response=${token}`,
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //         if (json.success) {
    //             console.log('reCAPTCHA verification succeeded');
    //             const reCAPTCHAMsg = {
    //                 method: 'GET',
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify(
    //                     {
    //                         title: 'reCAPTCHA',
    //                         signUpResult: 'OK',
    //                     })
    //             }
    //             res.type('application/json')
    //             res.send(reCAPTCHAMsg)
    //             return
    //         } else {
    //             console.log('reCAPTCHA verification failed');
    //             res.status(400)
    //             res.send("ReCAPTCHA verification failed")
    //             return
    //         }
    // });
})

app.get('/getCarsData', (req, res) => {
    console.log(`GET cars table`)

    // res.header('Access-Control-Allow-Origin', '*')
    var query = `SELECT * FROM ${CARS_TABLE.name}`
    databaseConnection.query(query, (err, result) => {
        if (err) {
            // res.status(500)
            // res.send(err)
            //     return
            console.log(err)
            throw err
        }
        res.send(result)
    })
})

app.post('/deleteCar', (req, res) => {
    console.log(`Delete car from table`)
    // res.header('Access-Control-Allow-Origin', '*')
    const query = `Delete FROM ${CARS_TABLE.name} WHERE ${CARS_TABLE.columns.treatmentNumber} = ?`
    databaseConnection.query(query, [req.body.treatmentNumber], (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})

app.post('/addNewCarService', (req, res) => {
    console.log("POST Add-New-Car-Service")

    if (req.body.title !== "AddNewCarService") {
        res.status(400)
        res.send("Bad Request.")
        return
    }

    /* Check if car treatment already exist */
    const query = `SELECT * FROM ${CARS_TABLE.name} WHERE ${CARS_TABLE.columns.treatmentNumber} = ?`
    databaseConnection.query(query, [req.body.treatmentNumber],
        (err, result) => {
            if (err) {
                res.status(500)
                res.send(err)
                return
            }
            if (result.length !== 0) {
                res.status(400)
                res.send("Treatment number already exists")
                return
            }

            /* Insert new car treatment */
            let query = `INSERT INTO ${CARS_TABLE.name} VALUES ('${req.body.treatmentNumber}','${req.body.treatmentInformation}', '${req.body.date}', '${req.body.workerEmail}', '${req.body.carNumber}')`
            console.log(query)
            databaseConnection.query(query,
                (err, result) => {
                    if (err) {
                        res.status(500)
                        res.send(err)
                        throw err
                    }

                    if (result.length === 0) {
                        res.status(400)
                        res.send("Invalid car service parameters.")
                        return
                    }

                    const addNewCarServiceMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'addNewCarService',
                                addNewCarResult: 'OK',
                            })
                    }

                    res.type('application/json')
                    res.send(addNewCarServiceMsg)
                })
        })
})

app.post('/editCarService', (req, res) => {
    console.log("POST editCarService")

    if (req.body.title !== "EditCarService") {
        res.status(400)
        res.send("Bad Reset Password Request.")
        return
    }

    const query = `UPDATE ${CARS_TABLE.name} SET ${CARS_TABLE.columns.treatmentInfo} = ?, ${CARS_TABLE.columns.dateT} = ?, ${CARS_TABLE.columns.workerEmail} = ?, ${CARS_TABLE.columns.carNumber} = ? WHERE ${CARS_TABLE.columns.treatmentNumber} = ?`
    databaseConnection.query(query, [req.body.treatmentInfo,req.body.dateT, req.body.workerEmail, req.body.carNumber, req.body.treatmentNumber],
        (err, result) => {
            console.log("result: ", query)
            console.log("fff", req.body.treatmentInfo,req.body.dateT, req.body.workerEmail, req.body.carNumber, req.body.treatmentNumber)
            if (err) {
                console.log(err)
                res.status(500)//Internal server error
                res.send(err)
                return
            }

            if (result.affectedRows === 0) {
                res.status(400)//bad request
                res.send("Invalid treatment number parameters.")
                return
            }

            const editCarServiceMsg = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        title: 'editCarService',
                        resetPasswordResult: 'OK',
                    })
            }
            res.type('application/json')
            res.send(editCarServiceMsg)
        })
})

app.listen(port, () => {
    console.log(`Car-Service server listening on http://localhost:${port}`)
})