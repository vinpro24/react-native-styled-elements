function validation(value) {
    const status = {
        number: 'incomplete',
        exp_month: 'incomplete',
        exp_year: 'incomplete',
        cvc: 'incomplete',
    };
    //const expName = /^[a-z ,.'-]+$/i;
    const expMonth = /^01|02|03|04|05|06|07|08|09|10|11|12$/;
    const expYear = /^18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50$/;
    const expCVC = /^[0-9]{3,3}$/;
    const cardType = detectCardType(value.number);
    if (value.number > 0 && cardType) {
        status.number = 'complete';
        value.type = cardType;
    }
    if (value.exp_month > 0 && expMonth.test(value.exp_month)) {
        status.exp_month = 'complete';
    }
    if (value.exp_year > 0 && expYear.test(value.exp_year)) {
        status.exp_year = 'complete';
    }
    if (value.cvc > 0 && expCVC.test(value.cvc)) {
        status.cvc = 'complete';
    }
    const valid = (status.number !== 'incomplete' && status.cardholderName !== 'incomplete' && status.cvc !== 'incomplete' && status.exp_month !== 'incomplete' && status.exp_year !== 'incomplete');
    return { valid, value, status };
}

function detectCardType(number) {
    var re = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        dankort: /^(5019)\d+$/,
        interpayment: /^(636)\d+$/,
        unionpay: /^(62|88)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        master: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
        amex: /^3[47][0-9]{5,}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    }

    for (var key in re) {
        if (re[key].test(number)) {
            return key
        }
    }
}

module.exports = validation;
