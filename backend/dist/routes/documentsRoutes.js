"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documentController_1 = require("../controllers/documentController");
const multer_1 = __importDefault(require("../utils/multer"));
const express_1 = require("express");
const protectedRoutes_1 = require("../utils/protectedRoutes");
const router = (0, express_1.Router)();
router.post('/upload', protectedRoutes_1.isLogin, multer_1.default.array('files', 8), documentController_1.uploadDocument);
router.get('/unseen', protectedRoutes_1.isChief, documentController_1.getBossesDocs);
router.get('/forwards', protectedRoutes_1.isChief, documentController_1.getForwardingDocs);
router.get('/incoms', protectedRoutes_1.isLogin, documentController_1.incomsDocs);
router.get('/outcoms', protectedRoutes_1.isLogin, documentController_1.outComeDocs);
router.get('/alloutcoms', protectedRoutes_1.isLogin, documentController_1.allOutcomes);
router.get('/all', protectedRoutes_1.isLogin, documentController_1.getAllDocs);
router.delete('/:id', protectedRoutes_1.isChief, documentController_1.deleteDoc);
router.get('/:id', protectedRoutes_1.isLogin, documentController_1.getById);
router.patch('/:id', protectedRoutes_1.isLogin, documentController_1.updateDoc);
router.get('/filter/:faxNo', documentController_1.filterDocument);
exports.default = router;
