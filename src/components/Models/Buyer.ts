import { IBuyer, TPayment , TOrderFormError} from "../../types/index";
import { IEvents } from "../base/Events";


export class Buyer {
    private payment: TPayment | null;
    private address: string;
    private email: string;
    private phone: string;

    constructor(protected events: IEvents) {
        this.payment = null;
        this.address = "";
        this.email = "";
        this.phone = "";
    }

    //Cохранение данных в модели.  Один общий метод
    setData(data: Partial<IBuyer>): void {
        if(data.payment !== undefined) {
            this.payment = data.payment
        }
        if(data.address !== undefined) {
            this.address = data.address
        }
        if(data.email !== undefined) {
            this.email = data.email
        }
        if(data.phone !== undefined) {
            this.phone = data.phone
        }  

        this.events.emit('buyer:changed')
    }

    //получение всех данных покупателя;
    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone
        }
    }

    //очистка данных покупателя;
    clearData(): void {
        this.payment =null;
        this.address = "";
        this.email = "";
        this.phone = "";

        this.events.emit('buyer:changed')
    }

    //валидация данных. 

    validate() : TOrderFormError {
        const errors: TOrderFormError = {}
        if(!this.payment) {
            errors.payment = "Не выбран тип оплаты"
        }
        if(!this.address.trim()) {
            errors.address ="Укажите адрес";
        }
        if(!this.email.trim()) {
            errors.email = "Укажите емэйл";
        }
        if(!this.phone.trim()) {
            errors.phone = "Укажите телефон";
        }
        return errors
    }

}