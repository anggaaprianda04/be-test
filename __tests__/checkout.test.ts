import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';
import { PORT } from '../src/utils/env'

let server: Server;

beforeAll(() => {
    server = app.listen(PORT);
})

afterAll(() => {
    server.close();
})

describe('POST /api/checkout', () => {
    it('should return correct discount and point', async () => {
        const res = await request(app)
            .post('/api/checkout')
            .send({ voucherPersen: 50 });

        expect(res.status).toBe(200);
        expect(res.body.meta.message).toBe('Berhasil Checkout');
        expect(res.body.data).toEqual({
            originalPrice: 5000000,
            discount: 2500000,
            finalPrice: 2500000,
            rewardPoints: 50000,
        });
    });

    it('should return 400 if voucher is invalid', async () => {
        const res = await request(app)
            .post('/api/checkout')
            .send({ voucherPersen: 0 });

        expect(res.body.meta.status).toBe(400);
        expect(res.body.meta.message).toBe('Voucher tidak valid');
    });
});
