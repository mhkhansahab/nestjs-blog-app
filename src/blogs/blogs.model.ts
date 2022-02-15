import * as mongoose from 'mongoose';

export const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export interface Blog extends mongoose.Document {
    id: string,
    title: string,
    description: string,
    author: string,
}