'use strict';

import Cloudinary from '../config/cloudinary';
import fs from 'fs';


var saveImage = (req, res, next) => {
    let body = req.body;

    console.log(body);
    res.json({
      data: body
    });

    // //
    // // var name = imagePath;
    // //
    // // console.log(name);
    // //
    // // res.json({
    // //   messageClou: imagePath
    // // });
    // // console.log(imagePath);
    //
    // // res.send(imagePath);
    // //
    // // if (imagePath === '') {
    // //     res.status(401);
    // //     res.json({
    // //         "status": 401,
    // //         "message": "Image not found"
    // //     });
    // // }
    //
    // Cloudinary.uploader.upload(imagePath, function(result) {
    //     console.log(result);
    //     res.json({
    //         message: "Image saved successfully",
    //         data: result
    //     });
    // });
    // var imageStream = fs.createReadStream(req.body, { encoding: 'binary' });
    // var cloudStream = Cloudinary.uploader.upload_stream(function() { res.redirect('/'); });
    //
    // imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
};

let getAll = (req, res, next) => {
    Cloudinary.api.resources(function(items) {
        console.log(items);
        res.json({
            message: items,
            images: items.resources
        });
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
