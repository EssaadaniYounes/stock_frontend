export function isEmail(value) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(value);
}

export function isText(value) {
    if (value.length < 0 && value.length <= 255) return true;
    return false;
}

export function isNumber(value) {
    return !isNaN(value);
}