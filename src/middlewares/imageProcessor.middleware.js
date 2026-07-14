const sharp = require("sharp");

const asyncHandler = require("../utils/asyncHandler");

const {
    uploadImage
} = require("../services/cloudinary.service");


module.exports = asyncHandler(
    async (req, res, next) => {

        if (!req.files || req.files.length === 0) {
            req.images = [];
            return next();
        }


        const uploadedImages = [];


        for (const file of req.files) {

            const compressedImage = await sharp(file.buffer)
                .resize({
                    width: 1200,
                    withoutEnlargement: true
                })
                .jpeg({
                    quality: 80
                })
                .toBuffer();


            const result = await uploadImage(
                compressedImage,
                "cmlite/listings"
            );


            uploadedImages.push(result);
        }


        req.images = uploadedImages;

        next();
    }
);