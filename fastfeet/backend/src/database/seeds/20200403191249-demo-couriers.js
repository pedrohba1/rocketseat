const { genCouriers } = require('../../utils/genCouriers');

module.exports = {
    up: queryInterface => {
        const couriers = genCouriers(100);

        return queryInterface.bulkInsert('couriers', couriers, {});
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('couriers');
    },
};
