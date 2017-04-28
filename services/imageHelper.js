'use strict';

import Cloudinary from '../config/cloudinary';
import fs from 'fs';
import formidable from 'formidable';
import del from 'del';


var saveImage = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/tmp/' + file.name;
    });

    form.on('file', function (name, file){
        console.log(name);
        console.log('Uploaded ' + file.name);

        Cloudinary.uploader.upload(file.path, function(result) {
            console.log(result);
            del([__dirname + '/tmp/*.*']).then(paths => {
          	   console.log('Deleted files and folders:\n', paths.join('\n'));
            });
            
            res.json({
                message: "Image saved successfully",
                data: result
            });
        });
    });
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
