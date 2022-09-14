const multer = require('multer')




//multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/admin/products")
    },
    filename: (req, file, cb) => {
       cb(null, Date.now() + file.originalname)
    }
})
const fileType = (req, file, cb) => {
    if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage, fileFilter: fileType })


module.exports = upload;