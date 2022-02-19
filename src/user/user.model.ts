import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export interface User extends mongoose.Document {
    id: string,
    name: string,
    password: string,
    email: string,
}