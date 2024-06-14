import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { getALLContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
      );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });
    });

    app.get('/contacts', async (req, res) => {
      const contacts = await getALLContacts();

      res.status(200).json({
        data: contacts,
        message: "Successfully found contacts!"
      });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

        if(!contact) {
          res.status(404).json({
            message: `${contactId}Student not found`
          });
          return;
        }

        res.status(200).json({
          data: contact,
          message: `Successfully found contact with id ${contactId}!`
        });
      });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
    });

    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`);
    });
};