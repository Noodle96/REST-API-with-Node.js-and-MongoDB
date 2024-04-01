require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
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

//Collection: Table
//Document: Row

//Request: What fronted sends us.
// Response: What we send back to the Clientt.
app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Hello World since index.js');
});
