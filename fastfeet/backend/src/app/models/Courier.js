import Sequelize, { Model } from 'sequelize';

class Courier extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
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
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default Courier;
