import Mail from '../../lib/Mail';

class NewPackageMail {
    get key() {
        return 'NewPackageMail';
    }

    async handle({ data }) {
        const { courier, recipient } = data;
        await Mail.sendMail({
            to: `${courier.name} <${courier.email}>`,
            subject: 'Você tem uma nova encomenda',
            template: 'newPackage',
            context: {
                dest: recipient.name,
                address: recipient.address,
                address_number: recipient.address_number,
                address_complement: recipient.address_complement,
                city: recipient.city,
                state: recipient.state,
                cep: recipient.cep,
            },
        });
    }
}

export default new NewPackageMail();
