const router = require('express').Router();
const { binIndex, binGetNew, binPostSave, binGetDuplicate, binGetDocument } = require('../controllers/bin.controllers');

router.get('/', binIndex);

router.get('/new', binGetNew);

router.post('/save', binPostSave);

router.get('/:id/duplicate', binGetDuplicate);

router.get('/:id', binGetDocument);

module.exports = router;
