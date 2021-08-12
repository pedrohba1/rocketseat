import {
    parseISO,
    isSameDay,
    getHours,
    setHours,
    setMilliseconds,
    setSeconds,
    setMinutes,
} from 'date-fns';

import PackageLimit from '../schemas/PackageLimit';
import Package from '../models/Package';

class DeliveryController {
    async store(req, res) {
        const { package_id, courier_id, signature_id } = req.body;
        const { type } = req.params;
        const delivery = await Package.findByPk(package_id);
        let { req_date } = req.body;

        // Se a data não for dada na requisição, a data do dia atual é utilizada
        req_date = req_date ? parseISO(req_date) : new Date();

        const startHours = getHours(req_date);

        // A data de início deve ser cadastrada assim que for feita a retirada do produto pelo entregador,
        // e as retiradas só podem ser feitas entre as 08:00 e 18:00h.
        // Não converti os horários para UTC, estão nas horas locais do sistema mesmo.
        if (startHours < 8 || startHours > 18) {
            return res.status(400).json({
                error: `Esse horário não é permitido para retirar entregas, você está no horário ${startHours}:00 (local), os horários permitidos são entre 8:00 e 18:00 (local)`,
            });
        }

        if (!delivery) {
            return res.status(400).json({
                error: 'Esse pacote não existe',
            });
        }

        if (delivery.canceled_at !== null) {
            return res.status(400).json({
                error: 'Esse pacote foi cancelado',
            });
        }

        if (type === 'end') {
            if (delivery.start_date === null) {
                return res.status(400).json({
                    error:
                        'Não é possível entregar uma encomenda que não tenha sido retirada',
                });
            }

            if (!signature_id) {
                return res.status(400).json({
                    error: 'signature_id não provida',
                });
            }
        }

        if (delivery.courier_id !== courier_id) {
            return res.status(400).json({
                error: `Esse pacote não pertence à este entregador`,
            });
        }
        if (delivery.start_date !== null && type === 'start') {
            return res.status(400).json({
                error: 'esse pacote já tem uma data de início',
            });
        }
        if (delivery.end_date !== null) {
            return res.status(400).json({
                error: 'Esse pacote já foi entregue',
            });
        }

        const limiterDate = setMilliseconds(
            setSeconds(setMinutes(setHours(req_date, 0), 0), 0),
            0
        );

        let limiter = await PackageLimit.findOne({
            courierId: courier_id,
            takenDate: limiterDate,
        });

        if (!limiter) {
            limiter = await PackageLimit.create({
                courierId: courier_id,
                packagesTaken: [],
                takenDate: limiterDate,
            });
        }

        if (type === 'start') {
            if (isSameDay(limiter.takenDate, req_date)) {
                if (limiter.packagesTaken.length === 5) {
                    return res.status(400).json({
                        error:
                            'Este entregador está tentando exceder o limite diário de retiradas',
                    });
                }
                const takenList = limiter.packagesTaken;
                takenList.push(package_id);
                await limiter.updateOne({
                    packagesTaken: takenList,
                });
            }
            await delivery.update({ start_date: req_date });
        }
        if (type === 'end') {
            await delivery.update({ end_date: req_date, signature_id });
        }

        return res.json(delivery);
    }
}

export default new DeliveryController();
