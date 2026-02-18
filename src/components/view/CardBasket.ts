import { ICardBasket } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected buttonDeleteElement: HTMLButtonElement;

    constructor(container: HTMLElement, onDeleteClick?: ()=> void) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.buttonDeleteElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

        if (onDeleteClick) {
            this.buttonDeleteElement.addEventListener("click", onDeleteClick)

        }
    
    }
    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

}