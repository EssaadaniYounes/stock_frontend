export default function currency(number) {
    var nb_decimal = 2;
    nb_decimal = (nb_decimal >= 0) ? nb_decimal : 2;
    var multiplier = Math.pow(10, nb_decimal || 0);
    var x = Math.round(number * multiplier) / multiplier;

    number = parseFloat(number).toFixed(nb_decimal);
    var parts = number.toString().split(".");
    var first = ("" + parts[0]).replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
    var second = parts[1];
    var amount = first + '.' + second;

    return amount;

}
export function isNumber(e) {

    
    let input_value = e.target.value;
    if (input_value != '' && isNaN(input_value)) {
        e.target.value = '';
        return;
    }
}
export function val(value) {
    if (value == '') {
        return 0;
    }
    return value;
}
