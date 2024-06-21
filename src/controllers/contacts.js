import createHttpError from 'http-errors';
import { getALLContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
    try {
      const contacts = await getALLContacts();

      res.json({
      status: 200,
      data: contacts,
      message: "Successfully found contacts!"
    });
    } catch (error) {
      next(error);
    }
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