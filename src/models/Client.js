import CreditCard from "./CreditCard";

class Client {
    constructor(clientPart: Partial<Client>) {
        if (clientPart){
            Object.assign(this, clientPart);
        }
    }
    id: any;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    tarjetasCredito: CreditCard [];
}

export default Client;