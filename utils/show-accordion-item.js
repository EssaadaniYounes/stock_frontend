import items from "@/data/SideBarItems";

export default function isShowAccordionItem(permissions = null, key) {
    let isVisible = false;

    if (permissions) {
        if (permissions[key]) {
            return isVisible = true;
        }
    }
    return isVisible;
}
