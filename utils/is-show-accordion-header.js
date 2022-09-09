import items from "../data/SideBarItems";

export default function isShowAccordionHeader(id, permissions = null) {
    if (permissions) {
        permissions = JSON.parse(permissions);
        const item = items.find(i => i.id == id);
        item.subItems.map(subItem => {
            if (permissions[subItem.title] != null) {
                console.log("Can show" + item)
            }
        })
    }
    else {
        console.log("No permissions")
    }
}
