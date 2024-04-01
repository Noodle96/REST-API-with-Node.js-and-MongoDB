const express = require('express');
const mongoose = require('mongoose');

const app = express();
//Accept request body from the client
app.use(express.json());

//Request: What fronted sends us.
// Response: What we send back to the Clientt.
app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Hello World since index.js');
});

app.listen(3000, () => { console.log('Server is running on port 3000');});