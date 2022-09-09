export default function isPermissionChecked(permissions, role, action) {
    let isChecked = false;
    Object.keys(permissions).map(key => {
        if (key == role) {
            permissions[key].map(a => {
                if (a == action) {
                    isChecked = true;
                    return;
                }
            })
        }
    });
    return isChecked;
}