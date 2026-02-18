

import { IOrderForm, TPayment } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";


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
            console.log('Клик по кнопке Онлайн')
            this.togglePayment('online')
            this.events.emit('orderForm:field-changed',{
                field: 'payment',
                value: 'online'
            })
        })
        this.cashButtonElement.addEventListener('click', () => {
            console.log('Клик по кнопке При получении');
            this.togglePayment('cash');
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

    togglePayment(payment: TPayment) {
        this.cardButtonElement.classList.remove('button_alt-active');
        this.cashButtonElement.classList.remove('button_alt-active');
        
        if (payment === 'online') {
            this.cardButtonElement.classList.add('button_alt-active');
        } else if (payment === 'cash') {
            this.cashButtonElement.classList.add('button_alt-active');
        }
    }

    set payment(value: TPayment) {
        this.togglePayment(value);
    }


    set address(value: string) {
        this.inputElement.value = value;
    }
}
