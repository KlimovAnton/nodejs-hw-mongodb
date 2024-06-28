import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/contacts-constants.js';

export const getALLContacts = async ({
    page = 1,
    perPage = 5,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
  }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    items: contacts,
    ...paginationData,
  };
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