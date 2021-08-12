const { genPackages } = require('../../utils/genPackages');

module.exports = {
    up: queryInterface => {
        const packages = genPackages(100, 100, 4);
        return queryInterface.bulkInsert('packages', packages, {});
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('packages');
    },
};
