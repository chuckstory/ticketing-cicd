import request from 'supertest';
import { app } from '../../app';

it('response with details about the current user', async () => {
    const cookie = await signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');  
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);

    //console.log('response', response.body.currentUser);

    expect(response.body.errors[0].message).toEqual('Not authorized');
})