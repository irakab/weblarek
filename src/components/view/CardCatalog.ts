import { ICardCatalog } from "../../types/index";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";





export class CardCatalog extends Card<ICardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
   


    constructor(container: HTMLElement, onClick: ()=> void) {
        super(container)
        this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container)
        this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container)
    
        container.addEventListener('click', (e) => {
            e.preventDefault(); // Добавьте это
            onClick();
        })
    } 
    set image(value:string) {
        this.imageElement.src = `${CDN_URL}/${value}`
        this.imageElement.alt = this.title;
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
 
}