import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const routerContacts = Router();

routerContacts.get('/contacts', ctrlWrapper(getContactsController));
routerContacts.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
routerContacts.post('/contacts', ctrlWrapper(createContactController));
routerContacts.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
routerContacts.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default routerContacts;