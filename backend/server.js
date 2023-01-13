const mysql = require('mysql')
const express = require('express')
const cors = require('cors');
const nodemailer =require('nodemailer');
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
            let query = `INSERT INTO ${USERS_TABLE.name} VALUES ('${req.body.email}','${req.body.firstName}', '${req.body.lastName}', '${req.body.password}', '${req.body.connected}')`
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

app.post('/ForgotPassword', (req, res) => {
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
                console.log("120")
                res.send(err)
                return
            }
            if (result.length == 0) {
                res.status(400)
                console.log("125")
                res.send("Email DOESN'T exists")
                return
            }
            ///////////////////////***********************************************fORGOT pASS*//////////////////////
            /* Insert new user */
            console.log("132")
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "yassminemoranProj@gmail.com",
                    pass: "ClientServer"
                }
            
            });
            console.log("140")
            const options ={
                from:"yassminemoranProj@gmail.com",
                to: "yassmine.student@outlook.com",
                subject: "try",
                text: "Hello"
            }
            transporter.sendMail(options, function(err,info){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("sent: "+info.response);
            
            })
            console.log("156")
                    const signUpMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'signUp',
                                signUpResult: 'OK',
                            })
                    }
                    console.log("166")
                    res.type('application/json')
                    res.send(signUpMsg)
                })
        })




app.listen(port, () => {
    console.log(`Car-Service server listening on http://localhost:${port}`)
})