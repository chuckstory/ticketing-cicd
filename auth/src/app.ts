import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@poowatickets/common';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };