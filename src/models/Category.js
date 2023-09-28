class Category {
    constructor(categoryPart: Partial<Category>) {
        if (categoryPart) {
            Object.assign(this, categoryPart);
        }
    }
    id: any;
    nombre: string;
}

export default Category;