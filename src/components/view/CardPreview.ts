
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardPreview extends ICard {
    category: string;
    image: string;
    description: string;
    buttonText: string;
}
export type CategoryKey = keyof typeof categoryMap;


export class CardPreview extends Card<ICardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;
    protected descriptionElement: HTMLElement;

    constructor(container: HTMLElement, onBasketClick?: ()=> void) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
        if(onBasketClick) {
            this.buttonElement.addEventListener("click", onBasketClick)
        }
    } 
    set id(value: string) {
        this.container.dataset.id = value;
    }

    set image(value:string) {
        this.imageElement.src = `${CDN_URL}/${value}`
    }

    set category(value: string) {
        this.categoryElement.textContent = value

       this.categoryElement.classList.remove(
        ...Object.values(categoryMap)
       )
       const className = categoryMap[value as keyof typeof categoryMap]
       if(className) {
        this.categoryElement.classList.add(className)
       }
    }
    set description (value: string) {
        this.descriptionElement.textContent = value;
    }
    set buttonText (value: string) {
        this.buttonElement.textContent = value;
    }
    set disabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}


