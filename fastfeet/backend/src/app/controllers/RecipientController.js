import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { name = '', page = 1 } = req.query;

        const recipients = await Recipient.findAll({
            where: {
                name: { [Op.like]: `${name}%` },
            },
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
                'id',
                'name',
                'address',
                'address_complement',
                'address_number',
                'state',
                'city',
                'cep',
            ],
        });

        return res.json(recipients);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string().required(),
            address_number: Yup.string().required(),
            address_complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail, invalid json',
            });
        }

        const recipient = await Recipient.create(req.body);
        return res.json(recipient);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            address: Yup.string(),
            address_number: Yup.string(),
            address_complement: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            cep: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail, invalid json',
            });
        }
        const pk = req.params.id;

        const recipient = await Recipient.findByPk(pk);

        if (!recipient) {
            return res.status(400).json({ error: 'recipient does not exist' });
        }

        const response = await recipient.update(req.body);

        return res.json(response);
    }

    async destroy(req, res) {
        const pk = req.params.id;

        const recipientExists = await Recipient.findByPk(pk);

        if (!recipientExists) {
            return res.status(400).json({ error: 'recipiente não existe' });
        }
        const recipientDestroyed = await Recipient.destroy({
            where: { id: pk },
        });
        return res.json(recipientDestroyed);
    }
}

export default new RecipientController();
