import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@poowatickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); //เพราะเราใช้ nginx เป็น proxy ต้อง set ให้ express trust proxy
app.use(json());
//เปิด sessioncookie
//jest จะ test กับ http ธรรมดาเพราะฉะนั้นถ้าเป็นการ test ให้ set secure เป็น false (secure: process.env.NODE_ENV !== 'test')
app.use(
    cookieSession({
        signed: false,
        secure: false
        //secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
