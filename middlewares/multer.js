import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const allowedFileTypes = ["image/jpg", "image/png"];
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("this file type is not supported"));
            return;
        }

        cb(null, "./uploads");
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);       
    },
});

export const singleUpload = multer({ storage}).single("image");