'use strict';

import cloudinary   from 'cloudinary';

cloudinary.config({
  cloud_name: 'ubikate-umss',
  api_key: '474833883778775',
  api_secret: 'Evcka38Rcw2Cn7HtnMLlPqsFgEM',
  secure: true
});


module.exports = cloudinary;
