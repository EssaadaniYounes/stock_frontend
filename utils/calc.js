export default function calcTotalAmount(items = null, key) {

    if (items) {
        return items.reduce((prev, cur) => prev + cur[key], 0)
    }
    return 0;
}

export function calcLastMonthAmount(items, invoiceItem, paidAmount) {
    let dus = 0;
    const previousItems = [];

    Object.keys(items).map(month => {
        Object.keys(items[month]).map(day => {
            const invoiceItems = items[month][day];

            invoiceItems.map(item => {
                if (item.is_target) {
                    if (item.month < invoiceItem.month) {
                        previousItems.push(item);
                    }
                    if (item.month == invoiceItem.month) {
                        if (item.day < invoiceItem.day) {
                            previousItems.push(item);
                        }
                        if (item.day == invoiceItem.day && new Date(item.created_at).getTime() <= new Date(invoiceItem.created_at).getTime()) {
                            previousItems.push(item);
                        }
                    }
                }
            })

        })
    })
    previousItems.map(item => {
        dus += item.total_amount - item.paid
    })
    return dus;
}
var getPreviousItem = function (items, key, i) {
    var keys = Object.keys(items).sort(function (a, b) { return a - b; });
    var index = keys.indexOf(key);
    if ((i == -1 && index > 0) || (i == 1 && index < keys.length - 1)) { index = index + i; }

    return keys[index];
}