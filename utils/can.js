export function can(permission, action) {
    let index = permission.indexOf(action);
    return index != -1 ? true : false;
}

