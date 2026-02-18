export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProductsResponse  {
    total: number;
    items: IProduct[]
}

export interface IOrderResponse {
    total: number;
    id: string
}

export interface IOrderRequest extends IBuyer  {
    total: number,
    items: string[]
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TPayment = "online" | "cash" | null;

export type TOrderFormError = {
    payment?: string
    address?: string;
    email?: string;
    phone?:string
}

export interface IGallery { catalog: HTMLElement[]};

export interface IHeader {counter: number};

export interface IModal {
    content: HTMLElement;
};

export interface ISuccess {
    total: number;
};

export interface ICard {
    id: string;
    title: string;
    price: number | null;
}

export interface ICardCatalog extends ICard {
    image: string;
    category: string;
}


export interface ICardPreview extends ICard {
    category: string;
    image: string;
    description: string;
    buttonText: string;
}

export interface ICardBasket extends ICard {
    index: number;
}

export interface IBasket{
    basketList: HTMLElement[];
    total: number
}

export interface IForm {
    errors: string;
}

export interface IOrderForm extends IForm {
    payment: TPayment;
    address: string;
}


export interface IContactForm extends IForm {
    email: string;
    phone: string
}