import { NextFunction, Request, Response } from 'express';
import Suburb from '../models/Suburb';

const getData = async (req: Request, res: Response, next: NextFunction) => {
    const { startPostcode, endPostcode } = req.body;
    const totalData = await Suburb.find({ postCode: { $gte: startPostcode, $lte: endPostcode }},{_id: 0, suburbName: 1}).sort({ suburbName: 1 });
    let totalCount = 0;
    totalData.map((data)=>{
        totalCount+=data.suburbName.length   
    })
    res.status(200).json({ totalCount: totalCount, totalData });
};

const createData = async (req: Request, res: Response, next: NextFunction) => {
    const suburb = await Suburb.insertMany(req.body);
    res.status(201).json({ suburb });
};
export default { createData, getData };
