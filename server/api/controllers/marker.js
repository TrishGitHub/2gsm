require('../models/marker');

const mongoose = require('mongoose');

module.exports.getMarker = (req, res) => {

	const marker = mongoose.model('marker');

	marker
		.find()
		.then(items => {
			if (!items.length) {
				res
					.status(200)
					.json({markers: []});
			} else {
				res
					.status(200)
					.json({markers: items});
			}
		});

};


module.exports.postMarker = (req, res) => {
	const Model = mongoose.model('marker');

	let item = new Model({
		latitude: req.body.latitude,
		longitude: req.body.longitude
	});
	item
		.save()
		.then(item => {
			return res
				.status(201)
				.json({status: 'Запись успешно добавлена'});
		}, err => {
			res
				.status(404)
				.json({
					status: 'При добавление записи произошла ошибка: ' + err
				});
		});

};

