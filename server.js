const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ShortUrl = require("./src/models/shortUrl");
const { render } = require("ejs");
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.set("views", path.join(__dirname, "/src/views"));
app.use(express.static(path.join(__dirname,"/src/public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

console.log(__dirname + "/src/public");

const dbconn = process.env.MONGODB_URI

mongoose.connect('mongodb+srv://spmco:DbKc07010@dburl.spiqqii.mongodb.net/?retryWrites=true&w=majority',
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.get("/edit", async (req, res) => {
  res.render("edit");
});


app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  
  shortUrl.clicks++;
  shortUrl.save();
  
  res.redirect(shortUrl.full);
});
app.get("/delete/:shortUrls", async (req, res) => {

    const { shortUrls } = req.params

  await ShortUrl.findByIdAndDelete(shortUrls, (err, result) => {

    console.log('el link ha sido eliminado')

  })

  res.redirect('/');
});

const port = process.env.PORT || 4400;
app.listen(process.env.PORT || 4400);
console.log(`listening at http://localhost:${port}`);
