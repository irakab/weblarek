
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


interface IBasket{
    basketList: HTMLElement[];
    total: number
    isButtonDisabled: boolean;
}

export class Basket extends Component<IBasket> {
    protected basketListElement: HTMLElement;
    protected basketButtonElement: HTMLButtonElement;
    protected totalPriceElement: HTMLElement;

    constructor (container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        
        this.basketButtonElement.disabled = true;
        this.basketButtonElement.addEventListener('click', () => {
            this.events.emit('orderForm:open');
        });
  
    }   
    set basketList(items: HTMLElement[]) {
        if(items) {
            this.basketListElement.replaceChildren(...items)
        }
    }

    set total(value: number) {
        this.totalPriceElement.textContent = `${value} синапсов`
    }
    set isButtonDisabled(value: boolean) {
        this.basketButtonElement.disabled = value;
    }
}