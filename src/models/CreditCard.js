class CreditCard {
    constructor(creditCard: Partial<CreditCard>) {
        if (creditCard){
            Object.assign(this, creditCard);
        }
    }
    id: any;
    numero: string;
    descripcion: string
}

export default CreditCard;