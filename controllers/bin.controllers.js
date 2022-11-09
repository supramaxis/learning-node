const documentModel = require('../models/document.model');

exports.binIndex = (req, res) => {
  const code = `Welcome to SpmBin
  
  This is a simple web app that allows you to share your code with others.`;

  res.render('bin-index', { code, language: 'plaintext' });
};

exports.binGetNew = (req, res) => {
  res.render('bin-new');
};

exports.binPostSave = async (req, res) => {
  const value = req.body.value;
  try {
    const document = await documentModel.create({ value });
    res.redirect(`/bin/${document._id}`);
  } catch (error) {
    console.error(error);
    res.render('bin-new', { value });
  }
};

exports.binGetDuplicate = async (req, res) => {
  const id = req.params.id;
  try {
    const document = await documentModel.findById(id);
    res.render('bin-new', { value: document.value });
  } catch (error) {
    console.error(error);
    res.redirect(`/bin/${id}`);
  }
};

exports.binGetDocument = async (req, res) => {
  const id = req.params.id;
  try {
    const document = await documentModel.findById(id);

    res.render('bin-index', { code: document.value, id });
  } catch (error) {
    console.error(error);
    res.redirect('/bin');
  }
};
