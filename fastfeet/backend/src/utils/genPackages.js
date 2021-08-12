function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genPackages(totalCouriers, totalRecipients, packsPerCourier) {
    const packageList = [];
    const productNames = [
        'videogame',
        'livro',
        'cadeira',
        'fone de ouvido',
        'cartas',
    ];

    const RandomStartDate = [new Date(), null];

    let i = 1;
    let j = 1;
    while (j <= packsPerCourier) {
        while (i <= totalCouriers) {
            packageList.push({
                recipient_id: getRandomInt(1, totalRecipients),
                courier_id: i,
                product: productNames[getRandomInt(0, 4)],
                canceled_at: null,
                end_date: null,
                start_date: RandomStartDate[getRandomInt(0, 1)],
                created_at: new Date(),
                updated_at: new Date(),
            });
            i += 1;
        }
        i = 1;
        j += 1;
    }
    return packageList;
}

exports.genPackages = genPackages;
