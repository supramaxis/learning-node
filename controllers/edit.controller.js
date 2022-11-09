const shortUrlModel = require('../models/shortUrlModel');


exports.getEditController = async (req, res) => {
  try {
    const shortUrl = await shortUrlModel.findById(req.params.id).lean();
    console.log(req.params.id);

    res.render('edit', { shortUrl: shortUrl });
  } catch (error) {
    console.log(error.message);
  }
}

exports.postEditController = async (req, res) => {
  console.log(req.body)
 const { id } = req.params
  await shortUrlModel.findByIdAndUpdate(id, req.body)

  res.redirect('/')
}