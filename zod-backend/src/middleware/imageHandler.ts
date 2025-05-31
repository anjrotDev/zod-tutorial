import { Request } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {

    cb(null, "./src/public/img");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validMimeTypes.includes(file.mimetype)) {
    console.log("Invlid file type");
    req.body = {
      ...req.body,
      profilePicture: null
    };
    return cb(null, false);
  }

  if (file.size === 0) {
    console.log("Invalid file size = 0");
    req.body = {
      ...req.body,
      profilePicture: null
    };
    return cb(null, false);
  }

  console.log("Valid file storge it and continue");
  cb(null, true);
};

export const uploadFile = multer({ storage, fileFilter });
