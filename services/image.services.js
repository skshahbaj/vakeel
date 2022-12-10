// import multer from "multer";
// import path from "path";
// console.log("Import image service");
// const imageStorage = multer.diskStorage({

//   destination: 'images',
//   filename: (req, file, cb) => {
//     console.log("Images-----", file)
//     cb(null, file.fieldname + '_' + 'product' + Date.now() + path.extname(file.originalname))
//   }
// });
// export const imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 1000000 * 3
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {

//       return cb(new Error('Please upload a Image'))
//     }
//     cb(undefined, true)
//   }
// })

import multer from "multer";
import path from "path";
console.log("concet----image services")

const imagepath = multer.diskStorage({
  destination: "upload",
  filename: (req, file, callback) => {
    console.log("Images-----", file)

    callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
     
  }
});

export const imageUpload = multer({
  storage: imagepath,
  limits: {
    fileSize: 1000000 * 3
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {

      return callback(new Error('Please upload a Image'))
    }
    callback(undefined,true)
  }
})
export const ExcelUploadUser = multer({
  storage: imagepath,
  limits: {
    fileSize: 1000000*2 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xlsx|csv)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Excel'))
     }
   cb(undefined, true)
}
})