import Sequelize, { Model } from 'sequelize';

class Package extends Model {
    static init(sequelize) {
        super.init(
            {
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );
        return this;
    }
    // esse trecho de código serve para trazer
    // informações de outra linha da tabela,
    // à partir de uma chave estrangeira.

    static associate(models) {
        this.belongsTo(models.Courier, {
            foreignKey: 'courier_id',
            as: 'courier',
        });
        this.belongsTo(models.File, {
            foreignKey: 'signature_id',
            as: 'signature',
        });

        this.belongsTo(models.Recipient, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
    }
}

export default Package;
