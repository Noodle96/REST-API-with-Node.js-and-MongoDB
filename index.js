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
// 500: Internal Server Error
// 422 Unprocessable Entity
// app.post('/products', (request, response) => {
// 	Product.create(request.body).then((newProduct) => {
// 		return response.status(201).json(newProduct);
// 	}).catch((error)=>{
// 		return response.status(500).json({error: error.message});
// 	});
// });

// 01: Validate the name is required
// 02: Validate the price is required
// 03: Validate the category is required
// 04: Validate the category is one of the following: Piscos, Vinos Nacionales, Vinos Chilenos, Vinos Argentinos, Vinos Españoles, Gin, Vodka, Ron, Aguardientes, Licores otros, Espumantes, Whisky
// optionals
// 05: Validate the price is a number
// 06: Validate the quantity is a number
// 07: Validate the active is a boolean
// 08: Validate the description is a string
// 09: Validate the description is at least 10 characters long
// 10: Validate the description is at most 500 characters long
// 11: Validate the name is at least 3 characters long
// 12: Validate the name is at most 50 characters long
// 13: Validate the price is at least 0.01
// 14: Validate the price is at most 10000

app.post('/products', async(request, response) => {
	try{
		// Validando [1]
		if(!request.body.name){ // Esto valida si name no existe en body or name="" tambien
			return response.status(422).json({error: 'The name field is required'});
		}
		//![1]
		// Validando [2]
		if(!request.body.price){
			return response.status(422).json({error: 'The price field is required'});
		}
		// "[2]
		// Validando [3]
		if(!request.body.category){
			return response.status(422).json({error: 'The category field is required'});
		}
		// Validando [4]
		else if(!Product.schema.path('category').enumValues.includes(request.body.category)){
			return response.status(422).json({error: `The category field must be one of the following: ${Product.schema.path('category').enumValues.join(', ')}`});

		}
		// ![3]
		

		const newProduct = await Product.create(request.body);
		return response.status(201).json(newProduct);
	}catch(error){
		return response.status(500).json({error: error.message});
	}
});
