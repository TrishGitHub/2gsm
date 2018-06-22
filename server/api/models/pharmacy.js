const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geoSchema = new Schema({
	type: String,
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

const pharmacySchema = new Schema({
    geometry: geoSchema
});

mongoose.model("pharmacy", pharmacySchema);

