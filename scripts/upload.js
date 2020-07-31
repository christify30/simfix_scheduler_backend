const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const upload = (path,name) => {     
    const bucket = process.env.bucket;
    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
    const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey
     });
     const upload = multer({
      limits: {fileSize: 2000 * 2000 * 5},
      storage: multerS3({
        s3:s3,
        bucket: bucket,
        acl: 'public-read',
        key: function (request, file, cb) {
          var newFileName = Date.now() + "-" + name;
          var fullPath = `${process.env.path}/${path}/` + newFileName;
          if  (file) {
           return cb( null , fullPath );//file.originalname
          }
          else{
            return cb(new Error('Unable to upload document please try again later'));
          }
        }
      }),
    
    })

    return upload;
}

module.exports = upload;