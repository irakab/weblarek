import { IApi, ObjectApi, DataResponse, DataPost } from "../../types/index";

export class WeblarekApi {

    constructor(private api:IApi) { 
        this.api = api
    }
    
    getProducts(): Promise<ObjectApi> {
        return this.api.get<ObjectApi>('/product')
    }
    postProducts(data: DataPost): Promise<DataResponse>{
        return this.api.post('/order', data)
    }

}