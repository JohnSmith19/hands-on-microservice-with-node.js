const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");

const express = require("express");
const sharp = require("sharp");
const app = express();

app.post(
  "/uploads/:image",
  bodyparser.raw({
    limit: "10mb",
    type: "image/*"
  }),
  (req, res) => {
    let fd = fs.createWriteStream(path.join(__dirname, "uploads", image), {
      flags: "w+",
      encoding: "binary"
    });

    fd.end(req.body);
    fd.on("close", () => {
      res.send({ status: "ok", size: req.body.length });
    });
  }
);

app.head("/uploads/:image", (req, res) => {
  fs.access(req.localpath, fs.constants.R_OK, err => {
    res.status(err ? 404 : 200).end();
  });
});
/*
app.get("/uploads/:image", (req, res) => {
  let fd = fs.createReadStream(
    path.join(__dirname, "uploads", req.params.image)
  );

  fd.on("error", e => {
    res.status(e.code === "ENOENT" ? 404 : 500).end();
  });

  res.setHeader("Content-Type", "image/" + path.extname(req.image).substr(1));
  fd.pipe(res);
});
*/

app.param("image", (req, res, next, image) => {
  if (!image.match(/\.(png|jpg)$/i)) {
    return res.status(req.method === "POST" ? 403 : 404).end();
  }

  req.image = image;
  req.localpath = path.join(__dirname, "uploads", req.image);

  return next();
});

app.param("width", (req, res, next, width) => {
  req.width = +width;

  return next();
});

app.param("height", (req, res, next, height) => {
  req.height = +height;

  return next();
});

app.get("/uploads/:width(\\d+)x:height(\\d+)-:image", download_image);
app.get("/uploads/_x:height(\\d+)-:image", download_image);
app.get("/uploads/:width(\\d+)x_-:image", download_image);
app.get("/uploads/:image", download_image);

app.listen(3000, () => {
  console.log("ready");
});

function download_image(req, res) {
  fs.access(req.localpath, fs.constants.R_OK, err => {
    if (err) return res.status(404).end();

    let image = sharp(req.localpath);

    if (req.width && req.height) {
      image.ignoreAspectRatio();
    }

    if (req.width || req.height) {
      image.resize(req.width, req.height);
    }

    res.setHeader("Content-Type", "image/" + path.extname(req.image).substr(1));
    image.pipe(res);
  });
}
