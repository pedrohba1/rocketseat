function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genName() {
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

    return `${fstName[Math.floor(Math.random() * 10)]} ${
        sndName[Math.floor(Math.random() * 5)]
    } ${trdName[Math.floor(Math.random() * 10)]}`;
}

function genEF() {
    const estados = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
    ];

    return estados[getRandomInt(0, estados.length - 1)];
}

function genCidade() {
    const cidade = [
        'Rio Branco',
        'Maceió',
        'Macapá',
        'Manaus',
        'Salvador',
        'Fortaleza',
        'Brasília',
        'Vitória',
        'Goiânia',
        'São Luís',
        'Cuiabá',
        'Campo Grande',
        'Belo Horizonte',
        'Belém',
        'João Pessoa',
        'Curitiba',
        'Recife',
        'Teresina',
        'Rio de Janeiro',
        'Natal',
        'Porto Alegre',
        'Porto Velho',
        'Boa Vista',
        'Florianópolis',
        'São Paulo',
        'Aracaju',
        'Palmas',
    ];

    return cidade[getRandomInt(0, cidade.length - 1)];
}

function genCEP(cidade) {
    const dict = {
        'Rio Branco': '69900',
        Maceió: '57000',
        Macapá: '68900',
        Manaus: '69400',
        Salvador: '40000',
        Fortaleza: '60000',
        Brasília: '70000',
        Vitória: '29000',
        Goiânia: '72800',
        'São Luís': '65000',
        Cuiabá: '78000',
        'Campo Grande': '79000',
        'Belo Horizonte': '30000',
        Belém: '66000',
        'João Pessoa': '58000',
        Curitiba: '80000',
        Recife: '50000',
        Teresina: '64000',
        'Rio de Janeiro': '20000',
        Natal: '59000',
        'Porto Alegre': '90000',
        'Porto Velho': '78900',
        'Boa Vista': '69300',
        Florianópolis: '88000',
        'São Paulo': '01000',
        Aracaju: '49000',
        Palmas: '77000',
    };

    const end = Math.floor(Math.random() * (899 - 100) + 100);
    return `${dict[cidade]}-${end.toString()}`;
}

function genAddress() {
    const ind = ['av. ', 'r. ', 'alm. '];
    const nom = ['Baobá', 'Frederico', 'Justino', 'dos Palmares', 'das Flores'];

    return (
        ind[Math.floor(Math.random() * 3)] + nom[Math.floor(Math.random() * 5)]
    );
}

function genRecipients(size) {
    const recipientList = [];
    let i = 0;

    let complement;
    while (i < size) {
        complement = [
            'nenhum',
            `apartamento ${getRandomInt(1, 8)}0${getRandomInt(0, 9)}`,
        ];

        recipientList.push({
            name: genName(),
            address: genAddress(),
            address_number: getRandomInt(10, 1001),
            state: genEF(),
            city: genCidade(),
            cep: genCEP(genCidade()),
            address_complement: complement[getRandomInt(0, 1)],
            created_at: new Date(),
            updated_at: new Date(),
        });
        i += 1;
    }

    return recipientList;
}

exports.genRecipients = genRecipients;
