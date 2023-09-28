import Product from "./Product";
import Client from "./Client";

class Sale {
    constructor(salePart: Partial<Sale>) {
        if (salePart) {
            Object.assign(this, salePart);
        }
    }
    id: any;
    fechaHora: Date;
    cliente: Client;
    productoVendidos: Product[];
    montoTotal: any;
}

export default Sale;