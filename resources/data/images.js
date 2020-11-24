const path = require("path");
const fs = require("fs");
const galleryDir = path.resolve(__dirname, "../assets/img/gallery");
const sizeOf = require("image-size");

function get() {
  let images = {};

  fs.readdirSync(galleryDir).forEach((file) => {
    // obtain the size of an image
    let dimensions = sizeOf(path.resolve(galleryDir, file));

    let image = file.slice(0, -4).split("-");
    let index = image[2];
    let size = image[1];

    if (!images.hasOwnProperty(index)) {
      images[index] = {};
    }

    if (!images.hasOwnProperty(size)) {
      images[index][size] = {};
    }

    images[index][size]["src"] = file;
    images[index][size]["dimensions"] = dimensions;
  });

  return Object.values(images);
}

module.exports = {
  get: get,
};
