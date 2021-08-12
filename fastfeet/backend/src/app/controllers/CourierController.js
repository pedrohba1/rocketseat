/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
    async show(req, res) {
        const { id } = req.params;

        const courier = await Courier.findOne({
            where: { id },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['url', 'path', 'id'],
                },
            ],
        });

        if (!courier) {
            return res.status(400).json({ error: 'Entregador não existe' });
        }

        return res.json(courier);
    }

    async index(req, res) {
        const { page = 1, name = '' } = req.query;

        const couriers = await Courier.findAll({
            where: {
                name: { [Op.like]: `${name}%` },
            },
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['url', 'path', 'id'],
                },
            ],
        });

        return res.json(couriers);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail',
            });
        }

        const CourierExists = await Courier.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (CourierExists) {
            return res.status(461).json({
                error: 'user already exists',
            });
        }

        const { id, name, email, avatar_id } = await Courier.create(req.body);

        return res.json({
            id,
            name,
            email,
            avatar_id,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            avatar_id: Yup.number()
                .positive()
                .integer(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const pk = req.params.id;
        const { avatar_id } = req.body;

        const courier = await Courier.findByPk(pk);
        if (!courier) {
            return res.status(400).json({ error: 'courier does not exist' });
        }

        if (avatar_id) {
            const avatarExists = await File.findByPk(req.body.avatar_id);
            if (!avatarExists) {
                return res.status(400).json({ error: 'avatar does not exist' });
            }
        }

        const response = await courier.update(req.body);

        return res.json(response);
    }

    async destroy(req, res) {
        const pk = req.params.id;

        const courierExists = await Courier.findByPk(pk);

        if (!courierExists) {
            return res.status(400).json({ error: 'courier does not exist' });
        }

        const courierDestroyed = await Courier.destroy({ where: { id: pk } });
        return res.json(courierDestroyed);
    }
}

export default new CourierController();
