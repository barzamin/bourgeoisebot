const AWS = require('aws-sdk');

function log(message) {
  console.log(message);

  if (process.env.S3_LOG == 'yes') {
    const s3 = new AWS.S3();

    s3.getObject({
      Bucket: process.env.S3_LOG_BUCKET,
      Key: 'log.txt',
    }, function(err, data) {
      let body = data && data.Body || "";

      body += `\n${message}`;
      s3.putObject({
        Bucket: process.env.S3_LOG_BUCKET,
        Key: 'log.txt',
        Body: body,
        ACL: 'public-read',
        ContentType: 'text/plain',
        ContentDisposition: 'inline',
      }, function(err, data) {
        if (err) console.log(err, err.stack);
      })
    })
  }
}

module.exports = {log};
