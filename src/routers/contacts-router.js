import { Router } from 'express';
import { getContactsController, getContactByIdController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const routerContacts = Router();

routerContacts.get('/contacts', ctrlWrapper(getContactsController));
routerContacts.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));


export default routerContacts;