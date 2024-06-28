import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getALLContacts = ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  return ContactsCollection.find().skip(skip).limit(perPage);
};

export const getContactById = (contactId) => {
    const contact = ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = (payload) => {
    const contact = ContactsCollection.create(payload);
    return contact;
};

export const deleteContact = (contactId) => {
    const contact = ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  };