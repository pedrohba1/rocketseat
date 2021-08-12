const { genRecipients } = require('../../utils/genRecipients');

module.exports = {
    up: queryInterface => {
        const recipients = genRecipients(100);
        return queryInterface.bulkInsert('recipients', recipients, {});
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('recipients');
    },
};
