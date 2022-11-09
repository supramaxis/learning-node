const router = require('express').Router();
const { getUploadFile, getDownloadFile, multerFunc, uploadPost } = require('../controllers/show.controllers');

router.get('/', (req, res) => {
  res.render('upload-index');
});

router.post('/api/v1', uploadPost);

router.get('/files/:uuid', getUploadFile);

router.get('/files/download/:uuid', getDownloadFile)

module.exports = router;
