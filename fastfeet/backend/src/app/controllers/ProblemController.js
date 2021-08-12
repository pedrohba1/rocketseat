import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import Courier from '../models/Courier';
import File from '../models/File';
import Recipient from '../models/Recipient';

class ProblemController {
    async show(req, res) {
        const { package_id } = req.params;

        const problem = await DeliveryProblem.findOne({
            where: { package_id },
        });

        if (!problem) {
            return res.json({ error: 'encomenda não tem um problema' });
        }

        return res.json(problem);
    }

    async index(req, res) {
        const {
            page = 1,
            list_packages = 'no',
            product = '',
            package_id = null,
        } = req.query;

        if (list_packages === 'yes') {
            const packs = await DeliveryProblem.findAll({
                order: ['id'],

                limit: 20,
                attributes: [],
                offset: (page - 1) * 20,
                include: [
                    {
                        model: Package,
                        as: 'package',
                        attributes: [
                            'id',
                            'product',
                            'start_date',
                            'end_date',
                            'canceled_at',
                        ],
                        where: {
                            product: { [Op.like]: `${product}%` },
                        },
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
                            },
                        ],
                    },
                ],
            });

            return res.json(packs);
        }

        const whereClausePackage =
            package_id !== null
                ? {
                      package_id,
                  }
                : {
                      id: { [Op.gt]: 0 },
                  };

        const problems = await DeliveryProblem.findAll({
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            where: whereClausePackage,
        });

        return res.json(problems);
    }

    async store(req, res) {
        const { package_id, description } = req.body;
        if (!(await Package.findByPk(package_id))) {
            return res.status(400).json({
                error: 'encomenda não existe',
            });
        }

        const problem = await DeliveryProblem.create({
            package_id,
            description,
        });

        return res.json(problem);
    }

    async destroy(req, res) {
        // essa rota não é para deletar o problema, e sim para
        // colocar um data de cancelamento no pacote que tiver esse problema
        const { delivery_problem_id } = req.params;

        const problem = await DeliveryProblem.findByPk(delivery_problem_id);

        if (!problem) {
            return res.json({ error: 'encomenda não tem um problema' });
        }

        const { package_id } = problem;
        const delivery = await Package.findByPk(package_id);

        if (delivery.canceled_at) {
            return res
                .status(400)
                .json({ error: 'encomenda já tem uma data de cancelamento' });
        }

        await delivery.update({ canceled_at: new Date() });

        return res.json(delivery);
    }
}

export default new ProblemController();
