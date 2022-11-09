const filesModel = require('../models/upload.model');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
    cb(null, uniqueName);
  }
});

let upload = multer({storage: storage}).single('myFile');

exports.uploadPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({error: err.message});
    }
    const file = new filesModel({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size
    });
    console.log(req.file);
    const response = await file.save();
    return res.json({ file: `${process.env.APP_BASE_URL}/upload/files/${file.uuid}` });
    
  });
  // return res.json({ success: 'archivo subido correctamente' });
}

exports.getUploadFile = async (req, res) => {
  try {
    const file = await filesModel.findOne({ uuid: req.params.uuid });

    return res.render('download', {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/upload/files/download/${file.uuid}`
    });
  } catch (error) {
    console.log(error);
    return res.render('download', {
      error: 'algo salio mal en la pagina download'
    });
  }
}

exports.getDownloadFile = async (req , res)=>{
  const file = await filesModel.findOne({uuid: req.params.uuid})

  const response = await file.save()
  const filePath = `${__dirname}/../${file.path}`
  res.download(filePath)
    // router code here
}
