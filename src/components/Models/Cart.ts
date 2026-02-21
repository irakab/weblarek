import { IProduct } from "../../types/index";
import { IEvents } from "../base/Events";

export class Cart {
    private products: IProduct[] = [];
    constructor (protected events: IEvents) {} 
    

    //получение массива товаров, которые находятся в корзине;
    getProducts(): IProduct[] {
        return this.products
    } 

    //добавление товара, который был получен в параметре, в массив корзины;
    addProduct(product: IProduct): void {
        this.products.push(product)
        this.events.emit('cart:changed')
    }

    //удаление товара, полученного в параметре из массива корзины;
    removeProduct(product: IProduct): void {
        this.products = this.products.filter(
            (item) => item.id !== product.id )
        this.events.emit('cart:changed')
    }

    //очистка корзины;
    clearCart(): void {
        this.products = []
        this.events.emit('cart:changed')
    }

    //получение стоимости всех товаров в корзине;
    getTotalPrice() : number {
        return this.products.reduce(
            (total, product) => total + (product.price || 0), 
            0 )
    }

    //получение количества товаров в корзине;
    getProductsCount() : number {
        return this.products.length;
    }

    //проверка наличия товара в корзине по его id, полученного в параметр метода.
    hasProduct(id: string): boolean {
        return this.products.some((product) => product.id === id)
    }
}