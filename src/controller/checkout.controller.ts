import { Request, Response } from 'express';

export const checkout = (req: Request, res: Response): void => {
    const hargaBarang = 5000000;
    const { voucherPersen } = req.body;

    if (!voucherPersen || voucherPersen <= 0 || voucherPersen > 100) {
        res.status(400).json({
            meta: {
                status: 400,
                message: 'Voucher tidak valid',
            }
        });
        return;
    }

    const potongan = (voucherPersen / 100) * hargaBarang;
    const hargaSetelahDiskon = hargaBarang - potongan;
    const pointReward = 0.02 * potongan;

    res.json({
        meta: {
            status: 200,
            message: 'Berhasil Checkout'
        },
        data: {
            originalPrice: hargaBarang,
            discount: potongan,
            finalPrice: hargaSetelahDiskon,
            rewardPoints: pointReward,
        },
    });
};
