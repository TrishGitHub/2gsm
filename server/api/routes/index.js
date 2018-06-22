const express = require('express');
const router = express.Router();

const ctrlMarker = require('../controllers/marker');
const ctrlPharmacy = require('../controllers/pharmacy');


router.get('/markers', ctrlMarker.getMarker);
router.post('/markers', ctrlMarker.postMarker);

router.get('/pharmacies', ctrlPharmacy.getPharmacy);
router.post('/pharmacies', ctrlPharmacy.postPharmacy);


router.get('*', (req, res) => {
	res.status(404).json({msg: 'Not found', err: 404});
});


module.exports = router;
