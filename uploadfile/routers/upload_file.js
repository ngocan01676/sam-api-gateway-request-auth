const express = require('express');
const AWS = require('aws-sdk');
const fileUpload = require("express-fileupload");
const s3 = new AWS.S3();

const fileUploadRouter = express.Router();
const BUCKET = 'upload-presigned';

fileUploadRouter.post('/docs/create', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

fileUploadRouter.post('/docs/file-upload',fileUpload(), async (req, res) => {
  try {
    //const formData = new FormData();
    // Populate the form data
    //formData.append('file', req.files.photos.data);
    const key = `${Date.now()}-${req.files.photos.name}`;
    const params = {
      'Bucket': BUCKET,
      'Key': key,
      'Body': req.files.photos.data,
    };
    // return res.status(200).json({
    //   file:req.files.photos.data
    // });
    // Upload file to S3 bucket
    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error: ', err);
            return res.status(400).json({
              error:err.toString()
            });
        }
        
        // Return successful response
        console.log('Success, File uploaded!');
        let params = {
          Bucket: BUCKET,
          Key: key,
          Expires: 300 // URL will expire after 5 minutes
        };
        const signedUrl = s3.getSignedUrl('getObject', params);
        return res.status(200).json({
          message: 'Upload file success',
          fileName: key,
          signedUrl:signedUrl
        });
    });
  } catch(ex) {
    return res.status(500).json({
      error: ex.toString()
    });
  }
});

fileUploadRouter.post('/docs/file-upload-simple',fileUpload(), async (req, res) => {
  try {
    return res.status(200).json({
      statusCode: 200,
      data:Buffer.from('hello world', 'utf8')
    })
    const key = `${Date.now()}-${req?.files?.file?.name}`;    
    const params = {
      'Bucket': BUCKET,
      'Key': key,
      'Body': req.files.file.data,
    };;
    // Upload file to S3 bucket
    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error: ', err);
            return res.status(400).json({
              error:err.toString()
            });
        }
        
        // Return successful response
        console.log('Success, File uploaded!');
        let params = {
          Bucket: BUCKET,
          Key: key,
          Expires: 300 // URL will expire after 5 minutes
        };
        const signedUrl = s3.getSignedUrl('getObject', params);
        return res.status(200).json({
          message: 'Upload file success',
          fileName: key,
          signedUrl:signedUrl
        });
    });
  } catch(ex) {
    return res.status(500).json({
      error: ex.toString()
    });
  }
});

module.exports = fileUploadRouter;
