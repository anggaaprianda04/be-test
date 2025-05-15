import request from 'supertest';
import app from '../src/app';

describe('GET Users', () => {
    it('should return list users', async () => {

        const res = await request(app)
            .get('/api/users');

        expect(res.body.meta.status).toBe(200);
        expect(res.body.meta.message).toBe('Berhasil ambil data user');
        expect(res.body.data).toBeDefined();
    });
});
