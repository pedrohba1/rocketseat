module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('delivery_problems', 'description', {
            type: Sequelize.TEXT,
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('delivery_problems');
    },
};
