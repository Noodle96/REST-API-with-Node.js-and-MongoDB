require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();

//Request: What fronted sends us.
// Response: What we send back to the Clientt.

//Accept request body from the client
app.use(express.json());

//CONNECT MONGOOSE TO OUR CLUSTER
mongoose.connect(process.env.MONGO_URI);

//Event to check if we are connected to the database
mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
	// console.log(process.env.MONGO_URI);
	app.listen(3000, () => { console.log('Server is running on port 3000');});
});
//Event to check if we are disconnected to the database
mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error:', err);
});



// 201: Created
//500: Internal Server Error
app.post('/products', (request, response) => {
	Product.create(request.body).then((newProduct) => {
		return response.status(201).json(newProduct);
	}).catch((error)=>{
		return response.status(500).json({error: error.message});
	});
});
