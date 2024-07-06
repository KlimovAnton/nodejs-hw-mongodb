import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { contactCreateSchema, contactUpdateSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

const routerContacts = Router();

routerContacts.get('/', ctrlWrapper(getContactsController));
routerContacts.get('/:contactId', ctrlWrapper(getContactByIdController));
routerContacts.post('/', validateBody(contactCreateSchema), ctrlWrapper(createContactController));
routerContacts.delete('/:contactId', ctrlWrapper(deleteContactController));
routerContacts.patch('/:contactId', validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

export default routerContacts;