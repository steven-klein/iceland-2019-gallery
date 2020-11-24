const path = require('path');
const fs = require ('fs');
const galleryDir = path.resolve(__dirname, '../assets/img/gallery');

function get() {
    let images = {};

    fs.readdirSync(galleryDir).forEach(file => {
      let image = file.slice(0, -4).split('-')
      console.log(file, image)
        let index = image[2]
        let size = image[1]

        if ( ! images.hasOwnProperty(index) ) {
            images[index] = {}
        }

        images[index][size] = file
    })

    return Object.values(images);
}

module.exports = {
    get: get
}
