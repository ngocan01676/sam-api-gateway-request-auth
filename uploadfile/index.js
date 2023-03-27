require('dotenv').config()
const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
require('dotenv').config()
var isMultipart = /^multipart\//i;
var urlencodedMiddleware = bodyParser.urlencoded({ extended: true });
const app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors({
  origin: '*'
}));
app.use(function (req, res, next) {
  var type = req.get('Content-Type');
  if (isMultipart.test(type)) return next();
  return urlencodedMiddleware(req, res, next);
});
// const crypto = require('crypto')
const serverless = require('serverless-http')
const fileUpload = require('./routers/upload_file');



app.use(bodyParser.json())

app.use(fileUpload)


module.exports.handler = serverless(app)