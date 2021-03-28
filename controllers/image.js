const Clarifai = require("clarifai");

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "398722092c44434d9527a8aea4aa41cc",
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
    console.log(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
