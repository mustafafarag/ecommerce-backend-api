const cloudinary = require('cloudinary');



// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// Function to upload an image to Cloudinary
// and return the URL and resource type
const cloudinaryUploadImage = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({url : result.secure_url, ressource_type: "auto"});
      }
    });
  });
};



module.exports = { cloudinaryUploadImage,};
