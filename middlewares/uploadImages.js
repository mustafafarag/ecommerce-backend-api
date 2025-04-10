const multer = require('multer'); // Middleware for handling multipart/form-data, primarily for file uploads.
const sharp = require('sharp'); // Library for image processing.
const path = require('path'); // Node.js module for handling and transforming file paths.
const fs = require('fs'); // Node.js module for interacting with the file system.


// Configure multer storage to specify destination and filename for uploaded files.
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images")); // Save files in the public/images directory.
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1e9); // Generate a unique suffix for the filename.
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg"); // Set the filename format.
    },
});

// Filter uploaded files to allow only images.
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file if it is an image.
    } else {
        cb(new Error('Unsupported File Format'), false); // Reject the file if it is not an image.
    }
};

// Configure multer with storage, file filter, and size limit.
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fieldSize: 2000000, // Limit file size to 2MB.
    },
});




const productImgResize = async (req, res, next) => {
    if (!req.files) return next(); // If no files are uploaded, proceed to the next middleware.

    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path) // Access the uploaded file's path.
                .resize(300, 300) // Resize the image to 300x300 pixels.
                .toFormat("jpeg") // Convert the image to JPEG format.
                .jpeg({ quality: 90 }) // Set the JPEG quality to 90%.
                .toFile(`public/images/products/${file.filename}`); // Save the resized image in the products directory.
            fs.unlinkSync(file.path); // Delete the original uploaded file.
        })
    );
    next(); // Proceed to the next middleware.
};



const blogsImgResize = async (req, res, next) => {
    if (!req.files) return next(); // If no files are uploaded, proceed to the next middleware.

    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path) // Access the uploaded file's path.
                .resize(300, 300) // Resize the image to 300x300 pixels.
                .toFormat("jpeg") // Convert the image to JPEG format.
                .jpeg({ quality: 90 }) // Set the JPEG quality to 90%.
                .toFile(`public/images/blogs/${file.filename}`); // Save the resized image in the blogs directory.
            fs.unlinkSync(file.path); // Delete the original uploaded file.
        })
    );
    next(); // Proceed to the next middleware.
};





module.exports = {uploadPhoto, productImgResize, blogsImgResize};