import { ContactsCollection } from '../db/models/contact.js';

export const getALLContacts = () => {
    const contacts = ContactsCollection.find();
    return contacts;
};

export const getContactById =  (contactId) => {
    const contact = ContactsCollection.findById(contactId);
    return contact;
};

