var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Shortener" });
});

function generateCode() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post("/new", (req, res, next) => {
  const url = req.body.url;
  console.log(url);

  const code = generateCode();
  res.send(`${process.env.DOMAIN}${code}`);
});

module.exports = router;
