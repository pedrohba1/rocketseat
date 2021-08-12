/* eslint-disable no-useless-concat */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
export default function formatNumber(number) {
    let x;
    let x1;
    let x2;

    number = `${number.toFixed(2)}`;
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? `,${x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
