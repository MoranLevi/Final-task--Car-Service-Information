const mysql = require('mysql')
const express = require('express')
const cors = require('cors');
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
            let query = `INSERT INTO ${USERS_TABLE.name} VALUES ('${req.body.email}','${req.body.firstName}', '${req.body.lastName}', '${req.body.password}', 0)`
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

app.listen(port, () => {
    console.log(`Car-Service server listening on http://localhost:${port}`)
})