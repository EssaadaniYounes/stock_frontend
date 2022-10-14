export default function calcTotalAmount(items = null, key) {

    if (items) {
        return items.reduce((prev, cur) => prev + cur[key], 0)
    }
    return 0;
}

export function calcLastMonthAmount(items, invoiceItem, paidAmount) {
    let dus = 0;
    const invoiceItems = [];
    Object.keys(items).map(month => {
        Object.keys(items[month]).map(day => {
            Object.keys(items[month][day]).map(item => {
                const curr = items[month][day][item];
                if (new Date(curr.dt).getTime() <= new Date(invoiceItem.dt).getTime())
                    invoiceItems.push(curr)
            })
        })
    })
    for (let i = 0; i < invoiceItems.length; i++) {
        dus += invoiceItems[i].amount;
    }

    return dus - paidAmount;
}
var getPreviousItem = function (items, key, i) {
    var keys = Object.keys(items).sort(function (a, b) { return a - b; });
    var index = keys.indexOf(key);
    if ((i == -1 && index > 0) || (i == 1 && index < keys.length - 1)) { index = index + i; }

    return keys[index];
}