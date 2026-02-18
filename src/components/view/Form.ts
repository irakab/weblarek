import { IForm } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export class Form<T extends IForm> extends Component<T> {
    protected formButtonElement: HTMLButtonElement;
    protected formErrorElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container)
        this.formButtonElement = ensureElement<HTMLButtonElement>(".button[type='submit']", this.container);
        this.formErrorElement = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    set errors(value: string) {
    
        this.formErrorElement.textContent = value;
    
        this.formButtonElement.disabled = value.trim() !== '';
        }
    }