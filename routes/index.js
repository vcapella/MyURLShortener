var express = require("express");
const { links } = require("express/lib/response");
var router = express.Router();
const Link = require("../models/link");

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

router.post("/new", async (req, res, next) => {
  const url = req.body.url;
  console.log(url);
  const code = generateCode();

  const result = await Link.create({
    url,
    code,
  });

  res.render("stats", result.dataValues);
  res.send(`${process.env.DOMAIN}${code}`);
});

module.exports = router;
