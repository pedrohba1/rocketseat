import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
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
        this.belongsTo(models.Package, {
            foreignKey: 'package_id',
            as: 'package',
        });
    }
}

export default DeliveryProblem;
