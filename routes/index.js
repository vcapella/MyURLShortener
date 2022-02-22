var express = require("express");
const { links } = require("express/lib/response");
var router = express.Router();
const Link = require("../models/link");

router.get("/:code", async (req, res, next) => {
  const code = req.params.code;
  const result = await Link.findOne({ where: { code } });
  if (!result) return res.sendStatus(404);

  result.hits++;
  await result.save();

  res.redirect(result.url);
});

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
  // res.send(`${process.env.DOMAIN}${code}`);  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
});

module.exports = router;
