import { isEmail, isText } from "./validate";

function validateOne(data, errors, setErrors) {
    let isValid = true;
    if (!isText(data.full_name)) {
        setErrors({ ...errors, full_name: 'Name needs to be at least 3 characters!!' });
        isValid = false;
    }
    else {
        setErrors({});
    }
    return isValid;
}
function validateProduct(data, errors, setErrors) {
    let isValid = true;
    if (!isText(data.name)) {
        setErrors({ ...errors, name: 'Name needs to be at least 3 characters!!' });
        isValid = false;
    }
    else {
        setErrors({});
    }
    return isValid;
}
export { validateOne, validateProduct };