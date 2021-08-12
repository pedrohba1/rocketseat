import Courier from '../models/Courier';

export default async (req, res, next) => {
    const { courier_id } = req.body;

    const courier = await Courier.findByPk(courier_id);
    if (!courier) {
        return res.status(400).json({
            error: 'courier does not exist',
        });
    }
    return next();
};
