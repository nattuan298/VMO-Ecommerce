import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(path.join('src', 'public') + '/upload'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-book-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/svg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  preservePath: true
});
