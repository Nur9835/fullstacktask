const express= require('express');
var cors= require('cors');
const connection= require('./connection');
const userRoute= require('./routes/user');
const branchesRoute = require('./routes/branches');
const reservationsRoute = require('./routes/reservations');
const restaurantsRoute= require('./routes/restaurants');

const app= express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/branches',branchesRoute);
app.use('/reservations',reservationsRoute);
app.use('/restaurants',restaurantsRoute);


module.exports=app;