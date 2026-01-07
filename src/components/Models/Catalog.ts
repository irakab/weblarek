import { IProduct } from "../../types/index";


export class Catalog { 
    // хранит массив товаров, выбранных покупателем для покупки.
    products : IProduct[] = [];
    selectedProduct : IProduct | null = null;
    
    constructor () {}

    setProducts (products : IProduct[]) : void {  //сохранить массив из продуктов
        this.products = products;
    }

    getProducts () : IProduct[] {  //получить массив продуктов
        return this.products
    }
    setSelected(product : IProduct) : void { //сохранение выбранного
        this.selectedProduct = product;
    }
    getSelected() : IProduct | null { //получение выбранного
            return this.selectedProduct
    }
    resetSelected() : void {
        this.selectedProduct = null; //сбрасываем выбор
    }

    getProductById(id: string) : IProduct | undefined { //получить продукт но id
        return this.products.find(product => product.id === id)
   
 }
}