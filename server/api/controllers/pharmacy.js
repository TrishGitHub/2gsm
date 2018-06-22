require('../models/pharmacy');

const mongoose = require('mongoose');

module.exports.getPharmacy = (req, res, next) => {

	const pharmacy = mongoose.model('pharmacy');

	pharmacy
		.aggregate().near({
			near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
			maxDistance: 100000,
			spherical: true,
			distanceField: 'dist.calculated'
		})
		.then(items => {
			if (!items.length) {
				res
					.status(200)
					.json({pharmacies: []});
			} else {
				res
					.status(200)
					.json({pharmacies: items});
			}
		});

};

module.exports.postPharmacy = (req, res) => {
	const Model = mongoose.model('pharmacy');

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


