const express = require('express');

const app = express();

app.use(express.json())


//Route imports

const user = require('./Routes/UserRoutes')


app.use("/api" , user)



module.exports = app;




