import { model, Schema } from "mongoose";
import { contactTypeList } from "../../constants/contacts-constants.js";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";


const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: contactTypeList,
            required: true,
            default: 'personal',
        },
        userId: { type: String, required: true, ref: 'users' },
        photo: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

contactsSchema.post("save", mongooseSaveError);
contactsSchema.pre("findOneAndUpdate", setUpdateSettings);
contactsSchema.post("findOneAndUpdate", mongooseSaveError);

export const ContactsCollection = model('contacts', contactsSchema);