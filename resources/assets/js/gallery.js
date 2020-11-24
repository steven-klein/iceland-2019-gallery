import m from 'mithril'

/**
 * Gallery
 */
let galleryModules = document.querySelectorAll(".gallery");

// image thumb component
let ImageThumb = (function () {
  function controller(param) {
    return param;
  }

  function validImage(image) {
    return (
      image.hasOwnProperty("full") &&
      image.hasOwnProperty("thumb") &&
      image.full !== undefined &&
      image.thumb !== undefined
    );
  }

  function view(ctrl) {
    return (validImage(ctrl.attrs.image)) ? m("li.gallery-thumb", [
      m("a", {
        title: `${ctrl.attrs.image.full}`,
        "data-fancybox": "gallery",
        href: `.${ctrl.attrs.path}${ctrl.attrs.image.full}`
      }, [
        m("img", {
          src: `.${ctrl.attrs.path}${ctrl.attrs.image.thumb}`
        })
      ])
    ]) : null;
  }

  return {
    view: view,
    controller: controller
  }

}())

let GalleryModule = (function () {
  var images = false;

  function controller(data) {
    return data;
  }

  function getIndex(file) {
    if( ! file.hasOwnProperty('full') )
      return null
    return file.full.slice(0, -4).split('-')[2]
  }

  function view(ctrl) {
    let images = (ctrl.attrs.hasOwnProperty('images')) ? ctrl.attrs.images : [];
    if (images.length <= 0) return;

    return m("ul.gallery-items", [
      images.map((image) => m(ImageThumb, {
        image: image,
        key: getIndex(image),
        path: window.gallery_data.IMAGE_PATH
      }))
    ]);
}

return {
  view: view,
  controller: controller,
}

}())

// mount video utility
function mountGalleries(el) {
  m.mount(el, {
    view: function () {
      return m(GalleryModule, {
        images: window.gallery_data.GALLERY_IMAGES
      });
    }
  });
}

[].forEach.call(galleryModules, mountGalleries);
