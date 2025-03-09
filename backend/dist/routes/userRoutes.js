"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const protectedRoutes_1 = require("../utils/protectedRoutes");
const multer_1 = __importDefault(require("../utils/multer"));
const router = (0, express_1.Router)();
router.post('/signin', authController_1.signIn);
router.post('/signup', multer_1.default.single('file'), authController_1.signUp);
router.get('/getAll', protectedRoutes_1.isAdmin, authController_1.getAllUsers);
router.patch('/update', authController_1.updateProfile);
router.get('/:id', authController_1.getById);
exports.default = router;
