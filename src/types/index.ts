export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ObjectApi = {
    total: number;
    items: IProduct[]
}

export type DataResponse ={
    total: number;
    id: string
}

export type DataPost = IBuyer & {
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

export type Errors = {
    payment?: string
    address?: string;
    email?: string;
    phone?:string
}

