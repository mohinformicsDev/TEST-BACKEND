"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Suburb_1 = __importDefault(require("../controllers/Suburb"));
const router = express_1.default.Router();
router.post('/fetchByPostcodeRange', Suburb_1.default.getData);
router.post('/create', Suburb_1.default.createData);
module.exports = router;
