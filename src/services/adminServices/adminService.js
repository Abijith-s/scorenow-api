require("dotenv").config();
const AWS = require("aws-sdk");

const AWS_S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.S3_REGION;
const accessKeyId = process.env.SCORENOW_S3_ACCESS_KEY;
const secretAccessKey = process.env.SCORENOW_S3_SECRET_KEY;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const s3 = new AWS.S3({
  params: { Bucket: AWS_S3_BUCKET },
  region: REGION,
});

const uploadPlayersImage = (body, key)=>{
    return new Promise(async (resolve, reject) => {
        try {
          var base64 = body.split("base64,")[1];
    
          var buffData = Buffer.from(base64, "base64");
    
          var params = {
            Bucket: AWS_S3_BUCKET,
            Key: `playerImages/${key}`,
            Body: buffData,
            ContentEncoding: "base64",
          };
    
          try {
            await s3.upload(params).promise();
            resolve(0);
          } catch (err) {
            console.log("err: ", err);
            reject(err);
          }
        } catch (err) {
          reject(err);
        }
      });
}

const uploadWebBannerImage = (body)=>{
  let key = 'webBanner';
  return new Promise(async (resolve, reject) => {
      try {
        var base64 = body.split("base64,")[1];
  
        var buffData = Buffer.from(base64, "base64");
  
        var params = {
          Bucket: AWS_S3_BUCKET,
          Key: `bannerImagesforWeb/${key}`,
          Body: buffData,
          ContentEncoding: "base64",
        };
  
        try {
          await s3.upload(params).promise();
          resolve(0);
        } catch (err) {
          console.log("err: ", err);
          reject(err);
        }
      } catch (err) {
        reject(err);
      }
    });
}

const uploadMobileBannerImage = (body, key)=>{
  return new Promise(async (resolve, reject) => {
      try {
        var base64 = body.split("base64,")[1];
  
        var buffData = Buffer.from(base64, "base64");
  
        var params = {
          Bucket: AWS_S3_BUCKET,
          Key: `bannerImagesforMobile/${key}`,
          Body: buffData,
          ContentEncoding: "base64",
        };
  
        try {
          await s3.upload(params).promise();
          resolve(0);
        } catch (err) {
          console.log("err: ", err);
          reject(err);
        }
      } catch (err) {
        reject(err);
      }
    });
}

const fetchPlayerImages = (fileKey)=>{
    try {
        const downloadParams = {
            Key: `playerImages/${fileKey}`,
            Bucket: AWS_S3_BUCKET,
        };
        return s3.getObject(downloadParams).createReadStream();
    } catch (err) {
        console.log("errorrr",err)
    }

}

const fetchBannerImages = ()=>{
 let  fileKey = 'webBanner';
  try {
      const downloadParams = {
          Key: `bannerImagesforWeb/${fileKey}`,
          Bucket: AWS_S3_BUCKET,
      };
      return s3.getObject(downloadParams).createReadStream();
  } catch (err) {
      console.log("errorrr",err)
  }

}

module.exports = {
    uploadPlayersImage, 
    uploadWebBannerImage,
    uploadMobileBannerImage,
    fetchPlayerImages,
    fetchBannerImages
}