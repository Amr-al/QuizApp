"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDocument = exports.allOutcomes = exports.outComeDocs = exports.incomsDocs = exports.deleteDoc = exports.getAllDocs = exports.getForwardingDocs = exports.getBossesDocs = exports.updateDoc = exports.getById = exports.uploadDocument = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const documentModel_1 = __importDefault(require("../models/documentModel"));
const autoIncModel_1 = __importDefault(require("../models/autoIncModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const permissions_1 = require("../utils/permissions");
exports.uploadDocument = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extracting the files from request and initializing the array path for saving the pathes 
    let images = [], files = req.files;
    const { from, faxNo, object, type } = req.body;
    // checking if there are files in the request 
    if (!files || (files === null || files === void 0 ? void 0 : files.length) === 0)
        return next(new appError_1.default('من فضلك اضف الفاكس', 400));
    for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); ++i)
        images.push(files[i].filename);
    // getting the docNumber then increment it
    const autoInc = yield autoIncModel_1.default.findOne({});
    let uniqueID = (autoInc === null || autoInc === void 0 ? void 0 : autoInc.docNumber) || 1;
    autoInc.docNumber = uniqueID + 1;
    let document = null, section = "";
    // assign the section depending on user' role
    if (type == 'outcome') {
        permissions_1.mapSections.forEach((sec) => {
            if (req.user.role === sec[0]) {
                section = sec[1];
            }
        });
        document = yield documentModel_1.default.create({ images, from, faxNo, uniqueID, object, type, sections: [section] });
    }
    else {
        document = yield documentModel_1.default.create({ images, from, faxNo, uniqueID, object, type });
    }
    autoInc.save();
    return res.status(200).json(document);
}));
exports.getById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // checking if the id is valid
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('Enter a valid ID', 400));
    }
    // getting the document and return it 
    const doc = yield documentModel_1.default.findById(id);
    return res.status(200).json(doc);
}));
exports.updateDoc = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params, role = req.user.role;
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default('not a valid Id', 400));
    }
    let doc = yield documentModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc) {
        return next(new appError_1.default('document is not exist', 404));
    }
    // mark the second review of the chief as true
    if (doc.type === 'outcome' && doc.reviewed === true && role.toLowerCase().includes('chief')) {
        doc.chiefReview = true;
    }
    // mark the document as readed depending on the user' role
    if (role === 'chief')
        doc.chief = true, doc.reviewed = true;
    if (role === 'infoChief')
        doc.infoChief = true;
    if (role === 'montChief')
        doc.montChief = true;
    if (role === 'planChief')
        doc.planChief = true;
    if (role === 'nobatgy')
        doc.nobatgy = true;
    doc.save();
    return res.status(200).json(doc);
}));
exports.getBossesDocs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let documents = null;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'chief' || (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin' && req.headers['role'] === 'chief')) {
        // finding documents not seen by chief
        documents = yield documentModel_1.default.find({ chief: false, type: 'income' });
    }
    else if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) === 'montChief' || (((_d = req.user) === null || _d === void 0 ? void 0 : _d.role) === 'admin' && req.headers['role'] === 'montChief')) {
        // finding documents not seen by chief of montadaben 
        documents = yield documentModel_1.default.find({ montChief: false, type: 'income' });
    }
    else if (((_e = req.user) === null || _e === void 0 ? void 0 : _e.role) == 'infoChief' || (((_f = req.user) === null || _f === void 0 ? void 0 : _f.role) === 'admin' && req.headers['role'] === 'infoChief')) {
        // finding documents not seen by chief of information
        documents = yield documentModel_1.default.find({ infoChief: false, type: 'income' });
    }
    else if (((_g = req.user) === null || _g === void 0 ? void 0 : _g.role) == 'planChief' || (((_h = req.user) === null || _h === void 0 ? void 0 : _h.role) === 'admin' && req.headers['role'] === 'planChief')) {
        // finding documents not seen by chief of planing
        documents = yield documentModel_1.default.find({ planChief: false, type: 'income' });
    }
    return res.status(200).json(documents);
}));
exports.getForwardingDocs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let documents = null;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'chief' || (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin' && req.headers['role'] === 'chief')) {
        // finding documents not seen by chief
        documents = yield documentModel_1.default.find({ "forwardTo.en": 'chief' });
    }
    else if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) === 'montChief' || (((_d = req.user) === null || _d === void 0 ? void 0 : _d.role) === 'admin' && req.headers['role'] === 'montChief')) {
        // finding documents not seen by chief of montadaben 
        documents = yield documentModel_1.default.find({ "forwardTo.en": 'montChief' });
    }
    else if (((_e = req.user) === null || _e === void 0 ? void 0 : _e.role) == 'infoChief' || (((_f = req.user) === null || _f === void 0 ? void 0 : _f.role) === 'admin' && req.headers['role'] === 'infochief')) {
        // finding documents not seen by chief of information
        documents = yield documentModel_1.default.find({ "forwardTo.en": 'infoChief' });
    }
    else if (((_g = req.user) === null || _g === void 0 ? void 0 : _g.role) == 'planChief' || (((_h = req.user) === null || _h === void 0 ? void 0 : _h.role) === 'admin' && req.headers['role'] === 'planChief')) {
        // finding documents not seen by chief of planing
        documents = yield documentModel_1.default.find({ "forwardTo.en": 'planChief' });
    }
    return res.status(200).json(documents);
}));
exports.getAllDocs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let response = [];
    // checking if the user is authorized to see the documents
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role.toLowerCase().includes('chief')) || ['admin', 'sec', 'nobatgy'].includes((_b = req.user) === null || _b === void 0 ? void 0 : _b.role)) {
        response = yield documentModel_1.default.find({ type: 'income' }).sort({ createdAt: -1 });
        return res.status(200).json(response);
    }
    else {
        return next(new appError_1.default("You don't have a permission", 400));
    }
}));
exports.deleteDoc = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // checking if the ID is valid and exist
    if (!id || !mongoose_1.default.isValidObjectId(id)) {
        return next(new appError_1.default("Not a valid ID", 400));
    }
    yield documentModel_1.default.findByIdAndDelete(id);
    return res.status(200).json("document deleted sucessfully");
}));
exports.incomsDocs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.user.role;
    let dependedSection = "", section = req.headers['section'];
    permissions_1.mapSections.forEach((sec) => {
        // map the required section according to user' role
        if (role === sec[0]) {
            dependedSection = sec[1];
        }
        // map the required section to the target section for whose has a permission
        if (section === sec[0]) {
            section = sec[1];
        }
    });
    let documents = null;
    if (["montadaben", "info", "planing", "retired", "affairs", "sec"].includes(role)) {
        documents = yield documentModel_1.default.find({ type: 'income', reviewed: true, sections: { $in: [dependedSection] } }).sort({ createdAt: -1 });
    }
    else if (['admin', 'chief', 'montChief', 'infoChief', 'planChief'].includes(role)) {
        documents = yield documentModel_1.default.find({ type: 'income', reviewed: true, sections: { $in: [section] } }).sort({ createdAt: -1 });
    }
    return res.status(200).json(documents);
}));
exports.outComeDocs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.user.role;
    let documents = null;
    let dependedSection = "";
    permissions_1.mapSections.forEach((sec) => {
        // map the required section depending on user' role
        if (role === sec[0]) {
            dependedSection = sec[1];
        }
    });
    documents = yield documentModel_1.default.find({ type: 'outcome', sections: { $in: [dependedSection] } }).sort({ createdAt: -1 });
    return res.status(200).json(documents);
}));
exports.allOutcomes = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.user.role;
    if (role != 'sec' && role != 'chief') {
        return next(new appError_1.default('you are not authorized', 400));
    }
    let documents = null;
    if (role == 'chief') {
        documents = yield documentModel_1.default.find({ type: 'outcome', reviewed: false,
            $or: [{ infoChief: true }, { montChief: true }, { planChief: true }] }).sort({ createdAt: -1 });
    }
    else {
        documents = yield documentModel_1.default.find({ type: 'outcome', reviewed: true }).sort({ createdAt: -1 });
    }
    res.status(200).json(documents);
}));
exports.filterDocument = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract fax Number from request params
    const { faxNo } = req.params;
    const document = yield documentModel_1.default.findOne({ uniqueID: faxNo });
    return res.status(200).json(document);
}));
