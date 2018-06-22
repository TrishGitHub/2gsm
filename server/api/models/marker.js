const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
	latitude: Number,
	longitude: Number,
});

mongoose.model("marker", markerSchema);
