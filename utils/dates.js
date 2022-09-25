export function itemsInMonth(items, invoices) {
    let months = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: []
    };
    for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j].month == i) {
                months[i].push(items[j]);
            }
        }
    }
    Object.keys(months).map((key) => months[key] = itemsInDays(months[key]));

    Object.keys(months).map((key) => {
        Object.keys(months[key]).map(dayKey => {
            months[key][dayKey].map((item, i) => {
                months[key][dayKey][i].dus = item.amount;
            })
        })
        if (Object.keys(months[key]).length == 0) {
            delete months[key];
        };
    });
    for (let i = 0; i < invoices.length; i++) {
        let paidAmount = 0;
        const invoice = invoices[i];
        paidAmount += +invoice.paid_amount;
        const paid_amount = months[invoice.month][invoice.day][0]['paid_amount'];
        months[invoice.month][invoice.day][0]['paid_amount'] = paid_amount
            ? paid_amount + paidAmount
            : paidAmount;
    }
    return months;

}

export function itemsInDays(items) {
    const days = {

    };
    for (let i = 0; i <= 30; i++) {
        days[i + 1] = [];
    }
    for (let i = 0; i < items.length; i++) {

        for (let j = 0; j <= 30; j++) {
            if ((j + 1) == items[i].day) {
                days[j + 1].push(items[i]);
            }
        }

    }
    Object.keys(days).map((key, index) => {
        if (days[key].length == 0) {
            delete days[key];
        }
    })
    return days;
}

export function getDate(date, yearFirst = false) {
    var dateObj = new Date(date);

    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    month = month < 10 ? '0' + month : month;
    var day = String(dateObj.getDate()).padStart(2, '0');
    var year = dateObj.getUTCFullYear();
    if (!yearFirst) return day + "/" + month + "/" + year;
    return year + "-" + month + "-" + day;
}