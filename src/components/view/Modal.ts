import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


interface IModal {
    content: HTMLElement;
};



export class Modal extends Component<IModal> {
    protected modalContent: HTMLElement;
    protected modalButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.modalContent = ensureElement<HTMLElement>('.modal__content');
        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close');

        this.modalButton.addEventListener('click', () => {
         this.close()
        })

        this.container.addEventListener('click',(e) => {
            if(e.target === this.container) {
               this.close()
            }
        })

        
        
    }
    set content(element: HTMLElement) {
        this.modalContent.replaceChildren(element);
        this.open()
    }

    open() :void {
        this.container.classList.add('modal_active')
    };

    close(): void {
        this.container.classList.remove('modal_active')
    };
}