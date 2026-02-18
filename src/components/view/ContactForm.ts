import { IContactForm } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";


export class ContactForm extends Form<IContactForm> {
    protected emailInputElement: HTMLInputElement;
    protected phoneInputElement: HTMLInputElement;
    
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.emailInputElement = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this.phoneInputElement = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);


        this.container.addEventListener('submit', (e) => {
            e.preventDefault()
            this.events.emit('contactForm:submit')
        });

        this.emailInputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.events.emit('contactForm:field-changed', {
                field: 'email',
                value: target.value
            })
        })
        this.phoneInputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.events.emit('contactForm:field-changed', {
                field: 'phone',
                value: target.value
            })
        })
    }

    set isButtonDisabled(value: boolean) {
        this.formButtonElement.disabled = value;
    }
    
    set email (value: string) {
        this.emailInputElement.value = value
    }

    set phone (value: string) {
        this.phoneInputElement.value = value
    }

}