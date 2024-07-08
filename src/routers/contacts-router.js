import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { contactCreateSchema, contactUpdateSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/contacts-constants.js';

const routerContacts = Router();

routerContacts.use(authenticate);

routerContacts.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));
routerContacts.get('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), ctrlWrapper(getContactByIdController));
routerContacts.post('/', checkRoles(ROLES.TEACHER), validateBody(contactCreateSchema), ctrlWrapper(createContactController));
routerContacts.delete('/:contactId', checkRoles(ROLES.TEACHER), ctrlWrapper(deleteContactController));
routerContacts.patch('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

export default routerContacts;