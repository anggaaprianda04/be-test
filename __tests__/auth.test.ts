import request from 'supertest';
import app from '../src/app';
import { v4 as uuidv4 } from 'uuid';

describe('POST /api/login-oauth', () => {
    it('should return token in cookie and body', async () => {
        const id = uuidv4();
        const username = `user_${id.slice(0, 8)}`;

        const res = await request(app)
            .post('/api/login')
            .send({ id, username });

        expect(res.body.meta.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should return 400 if missing fields', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'unknown' });

        expect(res.body.meta.status).toBe(400);
        expect(res.body.meta.message).toBe('ID dan Username wajib diisi');
    });
});
