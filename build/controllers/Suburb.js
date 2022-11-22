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
const Suburb_1 = __importDefault(require("../models/Suburb"));
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { startPostcode, endPostcode } = req.body;
    const totalData = yield Suburb_1.default.find({ postCode: { $gte: startPostcode, $lte: endPostcode } }, { _id: 0, suburbName: 1 }).sort({ suburbName: 1 });
    let totalCount = 0;
    totalData.map((data) => {
        totalCount += data.suburbName.length;
    });
    res.status(200).json({ totalCount: totalCount, totalData });
});
const createData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const suburb = yield Suburb_1.default.insertMany(req.body);
    res.status(201).json({ suburb });
});
exports.default = { createData, getData };
