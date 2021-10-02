const multer = require('multer')

const upload = multer({
  limits: {
    fileSize: 500000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx|odt)$/)) {
      return cb(new Error('Please upload a .jpg, .jpeg, .png, .pdf, .doc, .docx or .odt file'))
    }
    cb(undefined, true)
  }
})

module.exports = upload