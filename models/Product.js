//Collection: Table
//Document: Row
//fields our document
// Document Structure
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		default: 0,
	},
	active: {
		type: Boolean,
		default: true
	},
	category: {
		type: String,
		required: true,
		enum: ['Piscos', 'Vinos Nacionales', 'Vinos Chilenos',
			   'Vinos Argenitnos', 'Vinos Españoles', 'Gin', 'Vodka',
				'Ron', 'Aguardientes', 'Licores otros','Espumantes',
				'Whisky']
	},
},{
	// to include the timestamps: createdAt and updatedAt
	timestamps: true
});

module.exports = mongoose.model('Product', productSchema);