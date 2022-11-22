import mongoose, { Document, Schema } from 'mongoose';

export interface ISuburb {
    postCode: string;
    suburbName: string;
}

export interface SuburbModel extends ISuburb, Document {}

const SuburbSchema: Schema = new Schema(
    {
        postCode: { type: String, required: true },
        suburbName: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<SuburbModel>('Suburb', SuburbSchema);
