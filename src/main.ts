import './scss/styles.scss';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { WeblarekApi } from './components/Models/WeblarekAPI';
import { API_URL, CDN_URL} from './utils/constants'
import { cloneTemplate, ensureElement } from './utils/utils';

import { EventEmitter } from './components/base/Events';
import { Header } from './components/view/Header';
import { Gallery } from "./components/View/Gallery";

import { Modal } from './components/view/Modal';

import { Basket } from './components/view/Basket';

import { CardBasket } from './components/view/CardBasket';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';

import { ContactForm } from './components/view/contactForm';
import { OrderForm } from './components/view/OrderForm';

import { Success } from './components/view/Success';




const events = new EventEmitter();
const api = new Api(API_URL);
const weblarekAPI = new WeblarekApi(api);


//Модели 
const catalog = new Catalog(events);
const cart = new Cart(events)
const buyer = new Buyer(events)

//Отображение
        //шапка
const headerContainer = ensureElement<HTMLElement>('.header')
const header = new Header(headerContainer, events)
        //галлерея
const galleryContainer = ensureElement<HTMLElement>('.page')
const gallery = new Gallery(galleryContainer)
        //модальное окно 
const modalContainer = ensureElement<HTMLElement>('.modal')
const modal = new Modal(modalContainer, events);

        //отображение корзины

const basketView = new Basket(cloneTemplate('#basket'), events);

        //отображение формы заказа
const orderForm = new OrderForm(cloneTemplate('#order'), events);

        //отображение контактной формы
const contactForm = new ContactForm(cloneTemplate('#contacts'), events);
contactForm.isButtonDisabled = true;
        //отображение окна успешного заказа 
const successView = new Success(cloneTemplate('#success'), events);


//Загрузка с сервера
weblarekAPI.getProducts()
    .then((result) => {
        catalog.setProducts(result.items);
        //console.log(catalog)
    })
    .catch((error) =>{
        console.error('Ошибка загрузки товаров', error)
    })



    //События моделей
        //Рендер каталога товаров

events.on('catalog:changed', () => {
    const products = catalog.getProducts()
    /*console.log('каталог рендер')
    console.log('продукты из каталога', products)
    //проверка каждого продукта
    products.forEach((product, index) => {
        console.log(`Продукт ${index}:`, {
            id: product.id,
            title: product.title,
            type_id: typeof product.id,
            is_id: !!product.id
        });
    }); */

    const cards = products.map(product => {
        console.log('карточка для ', product.id, product.title)
        const card = new CardCatalog(
            cloneTemplate('#card-catalog'), ()=> {
                console.log('клик по карточке')
                console.log('кликнутый продукт', product)
                console.log('id кликнутого ', product.id) 
            events.emit('catalog:preview-changed', { id: product.id })
            });
        return card.render(product);   
    })
    gallery.render({ catalog: cards })

})


//Открыть preview выбранного товара

events.on('catalog:preview-changed', ({id}: {id:string}) => {
    console.log('событие превью ', id )
    const product = catalog.getProductById(id)
    console.log('товар ', product)
    if(!product) {
        console.log('продукт не найден')
        return
    }
    catalog.setSelected(product);
    const inCart = cart.hasProduct(product.id)
    console.log('в корзине', inCart)
    const preview = new CardPreview(cloneTemplate('#card-preview'), ()=> {
        console.log('кнопка нажата')
        if(cart.hasProduct(product.id)){
            cart.removeProduct(product)
        }else {
            cart.addProduct(product)
        };
        if(product.price == null) return;
        modal.close()
    })
    const previewData = {...product,
        buttonText: product.price === null
        ? 'Недоступно'
        :inCart
            ? 'Удалить из корзины'
            : 'В корзину'
    }
    console.log('превью данные', previewData)
    const renderedPreview = preview.render(previewData);
    console.log('превью элемент')
    modal.render({
        content: renderedPreview
    })
})

//Изменения в корзине

events.on('cart:changed', ()=> {
    header.counter = cart.getProductsCount()
    const products = cart.getProducts()
    if(products.length === 0) {
        basketView.render({
            basketList: [],
            total: 0,
        });
        basketView.isButtonDisabled = true;
        return;
    } 
    basketView.isButtonDisabled = false;
    const items = products.map((product, index) => {
        const item = new CardBasket(cloneTemplate('#card-basket'), () => {
            cart.removeProduct(product)
        })
        return item.render({ ...product, index: index + 1});
        });
   
    basketView.render({
        basketList: items,
        total: cart.getTotalPrice() ?? 0
    })
})


//Изменение данных покупателя
events.on('buyer:changed', () => {
    const data = buyer.getData();
    console.log('данные покупатеоля', buyer.getData())
   
    const orderErrors = buyer.validateOrder();
    const contactErrors = buyer.validateContacts();

    orderForm.render({
        payment: data.payment,
        address: data.address,
        errors: Object.values(orderErrors).join(' ')
    });

    contactForm.render({
        email: data.email,
        phone: data.phone,
        errors: Object.values(contactErrors).join(' ')
    });
});


//View события
    //открытие корзины

events.on('basket:open', () => {
    const products = cart.getProducts();

    if (products.length === 0) {
        basketView.isButtonDisabled = true
    }else {
        basketView.isButtonDisabled = false
    }
    modal.render({ content: basketView.render() })
    modal.open()
})


    //ФОРМЫ
    //формирование заказа

events.on('orderForm:open', () => {
    modal.render({ content: orderForm.render() })
    modal.open
        })
       
       
        //форма заказа
events.on <{ field: string, value: string }>('orderForm:field-changed', ({ field, value }) => {
    buyer.setData({ [field]: value });
          
    const errors = buyer.validateOrder();
    orderForm.errors = Object.values(errors).join(' | ');
    orderForm.payment = buyer.getData().payment;
    orderForm.address = buyer.getData().address || '';
          });

events.on('orderForm:submit', () => {
    const errors = buyer.validateOrder();
  
    if (Object.keys(errors).length > 0) {
      orderForm.errors = Object.values(errors).join(' | ');
      return;
    }
  
    modal.content = contactForm.render();
  });


    //контактная форма
events.on <{ field: string, value: string }>('contactForm:field-changed', ({ field, value })  => {
    buyer.setData({ [field]: value});
    const errors= buyer.validateContacts();
    contactForm.errors = Object.values(errors).join(' | ');
    contactForm.email =buyer.getData().email;
    contactForm.phone = buyer.getData().phone;
});

events.on('contactForm:submit', () => {
    const  orderData = { ...buyer.getData(), 
                        items: cart.getProducts().map(product => product.id),
                        total: cart.getTotalPrice()
                    }
    weblarekAPI.getProducts()
        .then(()=> {
            cart.clearCart();
            buyer.clearData();
            modal.render( {content: successView.render({ total: orderData.total ?? 0 })
        })

        })
    })
    
    //закрытие модального
events.on('modal:close', () => modal.close());
events.on('success:close', () => modal.close());

