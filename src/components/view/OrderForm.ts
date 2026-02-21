

import { TPayment } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IForm } from "./Form";

interface IOrderForm extends IForm {
    payment: TPayment;
    address: string;
}

export class OrderForm extends Form<IOrderForm>  {
    protected cardButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;
    protected inputElement: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.cardButtonElement = ensureElement<HTMLButtonElement>(".button[name='card']", this.container);
        this.cashButtonElement = ensureElement<HTMLButtonElement>(".button[name='cash']", this.container);
        this.inputElement = ensureElement<HTMLInputElement>(".form__input[name='address']", this.container)
        
        this.container.addEventListener('submit', (e) => {
            e.preventDefault()
            this.events.emit('orderForm:submit')
        });
        this.cardButtonElement.addEventListener('click', () => {
            this.events.emit('orderForm:field-changed',{
                field: 'payment',
                value: 'online'
            })
        })
        this.cashButtonElement.addEventListener('click', () => {

            this.events.emit('orderForm:field-changed',{
                field: 'payment',
                value: 'cash'
                })
            })
        this.inputElement.addEventListener('input', (e) =>{
            const target = e.target as HTMLInputElement;
            this.events.emit('orderForm:field-changed', {
                field: 'address',
                value: target.value
            })
        })
    }
        
        
        

    set payment(value: TPayment) {
        this.cardButtonElement.classList.remove('button_alt-active');
        this.cashButtonElement.classList.remove('button_alt-active');
        if (value === 'online') {
            this.cardButtonElement.classList.add('button_alt-active');
        } else if (value === 'cash') {
            this.cashButtonElement.classList.add('button_alt-active');
        }
    }
    


    set address(value: string) {
        this.inputElement.value = value;
    }
}