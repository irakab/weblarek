import { IApi, IProductsResponse, IOrderResponse, IOrderRequest } from "../../types/index";

export class WeblarekApi {

    constructor(private api:IApi) { 
        this.api = api
    }
    
    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product')
    }
    postProducts(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', data)
    }

}