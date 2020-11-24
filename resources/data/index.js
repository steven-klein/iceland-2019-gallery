var package = require('./../../package.json');
var images = require('./images.js');

module.exports = {
    "_comment": "Application data made available to handlebars.",
    "name": "Iceland 2019",
    "description": "",
    "version": package.version || "",
    "environment": process.env.NODE_ENV || "development",
    "production": (process.env.NODE_ENV === "production"),
    "images": JSON.stringify(images.get()),
    "download_url": ""
}
