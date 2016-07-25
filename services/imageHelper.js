'use strict';

import Cloudinary from '../config/cloudinary';


var saveImage = (req, res, next) => {
  let imagePath = req.files.placeImage.path;
  console.log(imagePath);
  if (imagePath === '') {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Image not found"
    });
  }

  Cloudinary.uploader.upload(imagePath, function(result) {
    console.log(result);
    res.json({
      message: "Image saved successfully",
      data: result
    });
  });
};

let getAll = (req, res, next) => {
  Cloudinary.api.resources(function(items){
    console.log(items);
    res.render('index', { images: items.resources, title: 'Places Pictures' });
  });
};

let getSample = (req, res, next) => {
  Cloudinary.api.resource("sample", (result) => {
    console.log(result.url);
    res.send(result);
  });
};

let getImage = (req, res, next) => {
  let imageId = req.params.public_id;
  console.log(imageId);
  Cloudinary.api.resource(imageId, (result) => {
    console.log(result.url);
    res.send(result.url);
  });
};

module.exports = {
    saveImage: saveImage,
    getAll: getAll,
    getSample: getSample,
    getImage: getImage
};
