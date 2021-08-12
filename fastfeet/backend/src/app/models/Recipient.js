import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                address: Sequelize.STRING,
                address_number: Sequelize.STRING,
                address_complement: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Recipient;
