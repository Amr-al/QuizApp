"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        const toCheck = ['jpg', 'png', 'jpeg'];
        if (!toCheck.includes(extension)) {
            cb(new Error("Not a valid Image"), '../frontend/public/uploads');
        }
        cb(null, '../frontend/public/uploads');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, Date.now() + '.' + extension);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
