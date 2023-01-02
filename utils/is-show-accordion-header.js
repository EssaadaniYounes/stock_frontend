export default function isShowAccordionHeader(item, permissions = {}) {
    let isShow = false;
    item.subItems.map(SI => {
        Object.keys(permissions).map(key => {
            if (key == SI.key) {
                isShow = true;
            }
        })
    })
    return isShow;
}
