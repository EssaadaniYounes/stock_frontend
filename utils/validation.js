import { isEmail, isText } from "./validate";

function validateClientVendor(data, errors, setErrors) {
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
export { validateClientVendor };