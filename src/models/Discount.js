class Discount {
    constructor(discountPart: Partial<Discount>) {
        if (discountPart) {
            Object.assign(this, discountPart);
        }
    }
    id: any;
    fechaInicio: Date;
    fechaFin: Date;
    porcentaje: any;
    marcaProducto: string;
    tarjeta: string;
}

export default Discount;