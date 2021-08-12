function genNames(size) {
    const fstName = [
        'Ovid',
        'Zedan',
        'Bramzik',
        'Jashun',
        'Eger',
        'Bhardem',
        'Jion',
        'Qun',
        'Fomur',
        'Bravek',
    ];

    const sndName = ["O'", 'Sur', 'Von', 'Derr', 'Di'];

    const trdName = [
        'Punna',
        'Bhinan',
        'Stillroot',
        'Sharprider',
        'Khussei',
        'Netsk',
        'Jundrek',
        'Chudog',
        'Dikhe',
        'Onamera',
    ];

    const nameList = [];

    while (nameList.length < size) {
        const name = `${fstName[Math.floor(Math.random() * 10)]} ${
            sndName[Math.floor(Math.random() * 5)]
        } ${trdName[Math.floor(Math.random() * 10)]}`;
        nameList.push(name);
    }

    return nameList;
}

function genEmails(size) {
    const fstName = [
        'Ovid',
        'Zedan',
        'Bramzik',
        'Jashun',
        'Eger',
        'Bhardem',
        'Jion',
        'Qun',
        'Fomur',
        'Lalek',
    ];

    const sndName = ["O'", 'Sur', 'Von', 'Derr', 'Di'];

    const trdName = [
        'Punna',
        'Bhinan',
        'Stillroot',
        'Sharprider',
        'Khussei',
        'Netsk',
        'Jundrek',
        'Chudog',
        'Dikhe',
        'Onamera',
    ];

    const provedor = [
        '@hotmail.com',
        '@gmail.com',
        '@yahoo.com',
        '@outlook.com',
        '@openmailbox.org',
    ];
    const emailList = [];
    while (emailList.length < size) {
        const email = `${fstName[Math.floor(Math.random() * 10)]}_${
            sndName[Math.floor(Math.random() * 5)]
        }_${trdName[Math.floor(Math.random() * 10)]}${
            provedor[Math.floor(Math.random() * 5)]
        }`;
        if (!emailList.includes(email)) emailList.push(email);
    }

    return emailList;
}

function genCouriers(size) {
    const names = genNames(size);
    const emails = genEmails(size);

    const courierList = [];
    let i = 0;

    while (i < size) {
        courierList.push({
            name: names[i],
            email: emails[i],
            created_at: new Date(),
            updated_at: new Date(),
        });
        i += 1;
    }

    return courierList;
}

exports.genCouriers = genCouriers;
