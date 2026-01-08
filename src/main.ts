import './scss/styles.scss';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { WeblarekApi } from './components/Models/WeblarekAPI';
import { API_URL } from './utils/constants'

console.log('***CATALOG***')
const productsModel = new Catalog();
productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts()) 
console.log('Поиск товара по ID: ', productsModel.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
productsModel.setSelected(apiProducts.items[1]);
console.log('Выбранный товар: ',productsModel.getSelected())
productsModel.resetSelected();
console.log('Выбранный товар: ',productsModel.getSelected())

console.log('')
console.log('***CART***');
const cartModel = new Cart();
cartModel.addProduct(apiProducts.items[0]);
cartModel.addProduct(apiProducts.items[1]);
console.log('Общая стоимость товаров в корзине:', cartModel.getTotalPrice());
console.log('Количество товаров в корзине:', cartModel.getProductsCount());
cartModel.removeProduct(apiProducts.items[0]);
console.log('Количество товаров в корзине:', cartModel.getProductsCount());
cartModel.clearCart();
console.log('Количество товаров в корзине:', cartModel.getProductsCount());

console.log('');
console.log('***BUYER***')
const buyerModel = new Buyer();

buyerModel.setData({payment:'cash',
address:'Linda Tannerin kuja 2F',
email: 'soosleek@gmail.com',
phone: '+358452693280'});

console.log('Данные покупателя', buyerModel.getData());


const buyerModelValidCheck = new Buyer();
buyerModelValidCheck.setData({payment:'cash',
address:'Linda Tannerin kuja 2F',
email: 'soosleek@gmail.com',
phone: ''});
console.log('Проверка валидности: ', buyerModelValidCheck.validate());

buyerModel.clearData()
console.log('Данные после очистки',buyerModel.getData());

const apiTest = new Api(API_URL);
const api = new WeblarekApi(apiTest)
api.getProducts()
    .then((result) => {
        const resultData = result.items;
        productsModel.setProducts(resultData);
        console.log('Полученный массив товаров',productsModel.getProducts());
        console.log('Титл первого полученного товара',productsModel.getProducts()[0].title);
    })
    .catch((error) =>{
        console.log('Ошибка при получении данных', error)
    }
    )






