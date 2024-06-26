import createHttpError from 'http-errors';
import { getALLContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
      const { page, perPage } = parsePaginationParams(req.query);
      const { sortBy, sortOrder } = parseSortParams(req.query);
      const filter = parseFilterParams(req.query);
      console.log(filter);
      const contacts = await getALLContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
      });

      res.json({
      status: 200,
      data: contacts,
      message: "Successfully found contacts!"
    });
  };

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

    if(!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
        status: 200,
        data: contact,
        message: `Successfully found contact with id ${contactId}!`
      });
    };

export const createContactController = async (req, res) => {

    const contact = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if(!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
  };

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if(!result) {
    next(createHttpError(404, 'Contact not Found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
