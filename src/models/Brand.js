class Brand {
    constructor(brandPart: Partial<Brand>) {
        if (brandPart) {
            Object.assign(this, brandPart);
        }
    }
    id: any;
    nombre: string;
}

export default Brand;