import axios from 'axios';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const results = req.query.results || 10;
    const page = req.query.page || 1;

    try {
        const response = await axios.get(`https://randomuser.me/api`, {
            params: { results, page }
        });

        const users = response.data.results.map((user: any) => ({
            name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
            location: `${user.location.street.number},${user.location.street.name}, ${user.location.city},${user.location.state} , ${user.location.country} `,
            email: user.email,
            age: user.registered.age,
            phone: user.phone,
            cell: user.cell,
            picture: [
                user.picture.large,
                user.picture.medium,
                user.picture.thumbnail
            ]
        }));

        res.status(200).json({
            meta: {
                status: 200,
                message: 'Berhasil ambil data user'
            },
            data: {
                users,
            }
        });
    } catch (error) {
        res.status(500).json({
            meta: {
                status: 500,
                message: 'Gagal ambil data user'
            }
        });
    }
}