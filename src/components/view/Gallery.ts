import { Component } from "../base/Component";

import { ensureElement } from "../../utils/utils";
import { IGallery } from "../../types/index"; 




export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;

    constructor(container:HTMLElement){
        super(container);
        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container)
    }
    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    };
};
