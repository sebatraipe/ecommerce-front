import Category from "./Category";
import Brand from "./Brand";

class Product {
    constructor(productBrand: Partial<Product>) {
        if (productBrand) {
            Object.assign(this, productBrand);
        }
    }
    id: any;
    descripcion: string;
    codigo: string;
    precio: any;
    categoria: Category;
    marca: Brand;
}

export default Product;