const calStockQty = (initial = 0, clients_in = 0, supp_in = 0, clients_rtrns = 0, supp_rtrns = 0) => (+initial + +clients_rtrns + +supp_in) - (+clients_in + +supp_rtrns);

export default calStockQty;