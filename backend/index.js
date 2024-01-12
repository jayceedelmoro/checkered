require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const baseURL = '/api/v1';

//mongoose config
mongoose.connect(process.env.MONGDB_URI);

const app = express();

app.use(cors({
    origin: ["http://localhost:3006", "https://checkered.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use( helmet() );
app.use( bodyParser.json() );
app.use( morgan('dev') );

//Routes
const UserRoutes = require('./routes/user');
const TaskRoutes = require('./routes/task');

app.use( `${baseURL}/users`, UserRoutes );
app.use( `${baseURL}/tasks`, TaskRoutes );

app.get('/', ( request, response ) => {
    response.status(200).send( `` );
});

app.listen( PORT, () => { console.log( `Server currently running on port ${PORT}` ) });