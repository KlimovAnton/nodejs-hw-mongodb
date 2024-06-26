import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { contactCreateSchema, contactUpdateSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

const routerContacts = Router();

routerContacts.get('/contacts', ctrlWrapper(getContactsController));
routerContacts.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
routerContacts.post('/contacts', validateBody(contactCreateSchema), ctrlWrapper(createContactController));
routerContacts.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
routerContacts.patch('/contacts/:contactId', validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

export default routerContacts;