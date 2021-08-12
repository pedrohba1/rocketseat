import * as Yup from 'yup';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import File from '../models/File';
import Queue from '../../lib/Queue';
import DeliveryProblem from '../models/DeliveryProblem';
import newPackageMail from '../jobs/NewPackageMail';

class PackageController {
    // Tem que colocar aqui no package controller um
    // query param para pegar só os packages que foram entregues
    async index(req, res) {
        const {
            per_page = 20,
            page = 1,
            product = '',
            courier_name = '',
            recipient_name = '',
            courier_id,
            pending_only = 'no',
            delivered_only = 'no',
        } = req.query;

        function SelectTypeOfSearch() {
            if (pending_only === 'yes') {
                return {
                    product: { [Op.like]: `${product}%` },
                    end_date: { [Op.is]: null },
                };
            }
            if (delivered_only === 'yes') {
                return {
                    product: { [Op.like]: `${product}%` },
                    end_date: { [Op.not]: null },
                };
            }

            return {
                product: { [Op.like]: `${product}%` },
            };
        }

        const packages = await Package.findAll({
            where: SelectTypeOfSearch(),
            order: ['id'],
            limit: per_page,
            offset: (page - 1) * per_page,
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'updated_at',
                'canceled_at',
            ],
            include: [
                {
                    model: Courier,
                    as: 'courier',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'url', 'path'],
                        },
                    ],
                    where: {
                        id: courier_id || {
                            [Op.gt]: 0,
                        },
                        name: { [Op.like]: `${courier_name}%` },
                    },
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['name', 'path', 'url'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'address',
                        'address_number',
                        'address_complement',
                        'state',
                        'city',
                        'cep',
                    ],
                    where: {
                        name: { [Op.like]: `${recipient_name}%` },
                    },
                },
            ],
        });

        return res.json(packages);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number()
                .integer()
                .positive()
                .required(),
            courier_id: Yup.number()
                .positive()
                .integer()
                .required(),
            product: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const courier = await Courier.findByPk(req.body.courier_id);
        if (!courier) {
            return res.status(400).json({ error: 'courier does no exist' });
        }

        const recipient = await Recipient.findByPk(req.body.recipient_id);
        if (!recipient) {
            return res.status(400).json({ error: 'recipient does no exist' });
        }

        const delivery = await Package.create(req.body);

        // usa a Queue pra enviar os emails para o entregador:
        await Queue.add(newPackageMail.key, {
            courier,
            recipient,
        });

        return res.json(delivery);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number()
                .integer()
                .positive()
                .required(),
            courier_id: Yup.number()
                .positive()
                .integer()
                .required(),
            product: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const courierExists = await Courier.findByPk(req.body.courier_id);
        if (!courierExists) {
            return res.status(400).json({ error: 'courier does no exist' });
        }

        const recipientExists = await Recipient.findByPk(req.body.recipient_id);
        if (!recipientExists) {
            return res.status(400).json({ error: 'recipient does no exist' });
        }

        const pk = req.params.id;

        const delivery = await Package.findByPk(pk);
        if (!delivery) {
            return res.status(400).json({ error: 'delivery does not exist' });
        }

        const {
            id,
            courier_id,
            recipient_id,
            signature_id,
            product,
        } = await delivery.update(req.body);

        return res.json({
            id,
            courier_id,
            recipient_id,
            signature_id,
            product,
        });
    }

    async destroy(req, res) {
        const pk = req.params.id;

        const delivery = await Package.findByPk(pk);
        if (!delivery) {
            return res.status(400).json({ error: 'delivery does not exist' });
        }

        const problem = await DeliveryProblem.findOne({
            where: {
                package_id: pk,
            },
        });

        if (problem) {
            if (delivery.canceled_at === null) {
                return res.status(461).json({
                    error:
                        'Esse pacote tem um problema e a entrega não foi cancelada, portanto, esse pacote não pode ser deletado',
                });
            }

            const problemDestroyed = await DeliveryProblem.destroy({
                where: {
                    package_id: pk,
                },
            });
            const packageDestroyed = await Package.destroy({
                where: {
                    id: pk,
                },
            });

            return res.json({
                problem: problemDestroyed,
                package: packageDestroyed,
            });
        }
        const packageDestroyed = await Package.destroy({
            where: {
                id: pk,
            },
        });

        return res.json(packageDestroyed);
    }
}

export default new PackageController();
