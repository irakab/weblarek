# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

#### Интерфейс товара 

    interface IProduct {
        id: string;
        title: string;
        image: string;
        categoty: string;
        price: number | null;
        description: string;
    }

    Поля интерфейса товара:
        id - уникальный идентификатор,
        title - название товара,
        image - ссылка на изображение товара,
        category - категория, к которой относится товар,
        price - цена за 1 единицу товара либо null в том случае, когда товар бесценен, то есть его невозможно купить,
        description - подробное описание товара.
    

 #### Интерфейс покупателя 

     interface IBuyer {
        payment: TPayment;
        email: string;
        phone: string;
        address: string;
    }
    
    Поля интерфейса покупателя:
        payment - способ оплаты варианты: картой, наличными или не выбран,
        email - электронная почта покупателя,
        phone - телефонный номер покупателя,
        address - адрес покупателя.


### Модели данных
В приложении используются три класса Catalog, Cart, Buyer.

#### Класс Catalog
Этот класс отвечает за хранение всех товаров, которые можно купить в приложении
а так же за хранение товара, выбранного для подробного отображения.

Поля класса:
    products : IProduct[] - массив товаров в каталоге
    selectedProduct : IProduct | null - выбранный товар для подробного отображения

Методы:
    setProducts (products : IProduct[]) : void - сохранение массива товаров полученного в параметрах метода;
    getProducts () : IProduct[] - получение массива товаров из модели;
    getProductById(id: string) : IProduct | undefined - получение одного товара по его id, в параметрах передается идентификатор товара;
    setSelected(product : IProduct) : void - сохранение товара, полученного в параметрах, для подробного отображения;
    getSelected() : IProduct | null - получение товара для подробного отображения.
    resetSelected() : void - сбрасывание/обнуление выборанного товара для подробного отображения;


#### Класс Cart
Класс отвечает за 
1) хранение массива выбранных для покупки товаров,
2) добавлегие и удаление товаров, 
3) подсчет стоимости всех товаров выбранных для покупки

Поля класса:
products: IProduct[] массив товаров выбранных для покупки

Методы:
getProducts(): IProduct[] получение массива товаров, которые находятся в корзине;
addProduct(product: IProduct): void добавление товара в корзину;
removeProduct(product: IProduct): void удаление товара;
clearCart(): void очистка корзины;
getTotalPrice() : number | null получение стоимости всех товаров в корзине;
getProductsCount() : number получение количества товаров в корзине;
hasProduct(id: string): boolean проверка наличия товара в корзине по его id.


#### Класс Buyer
Класс отвечаает за хранение данных покупателя (вид оплаты, адреc, телефон, email), которые тот должен указать при оформлении, также проводит проверку валидности этих данных.
Поля класса:
    payment: TPayment   способ оплаты 
    address: string     адресс покупателя
    email: string       емэйл покупателя
    phone: string       телефонный номер покупателя

Методы:
setData(data: Partial<IBuyer>): void сохранение данных в модели;
getData(): IBuyer получение всех данных покупателя;
clearData(): void очистка данных покупателя;
validate() : TOrderFormError валидация данных покупателя.

### Слой коммуникации
#### Класс WeblarekApi
Конструктор класса:
constructor(private api: IApi) принимает экземпляр класса, реализует интерфейс IApi

Методы класса: 
getProducts(): Promise<IProductsResponse> получение списка товаров
postProducts(data: IOrderRequest): Promise<IOrderResponse>отправка заказа




### Слой представления (View)
Кажды класс View наследует Component<T> и использует утилиту ensureElement для безопасного доступа к элементам DOM

#### Класс Header
Отвечает за отображение шапки с корзиной и кнопкой корзины

Интерфейс:
    interface IHeader {
        counter: number
        }

Коструктор класса:
    constructor(container:HTMLElement, events: IEvents) {}

Поля класса:
  basketButton: HTMLButtonElenent  кнопка корзины;
  counterElement: HTMLElement      счетчик товаров в корзине.


Методы класса: 
    set counter(value: number) изменяет отображение количества товаров в корзине.




#### Класс Gallery
Отображает каталог товаров

Интерфейс:
    interface IGallery {
        calatog: HTMLElement[];
    }

Конструктор класса:
    constructor(container:HTMLElement, events: IEvents) {}

Поля класса:
    catalogElement: HTMLElement   контейнер для карточек товаров в каталоге

Методы класса: 
    set catalog(items: HTMLElement[])  задает список из карточек товаров для отображения в каталоге



#### Класс Modal
Управляет модальным окном

Интерфейс:

    interface IModal {
            content: HTMLElement;
        }

Конструктор класса:
    constructor(container: HTMLElement, events: IEvents){}

Поля класса:
    modalContent: HTMLElement  контейнер для содержимого в моальном окне 
    modalButton:  HTMLButtonElement   кнопка закрытия модального окна
    
Методы класса: 
    set content(element: HTMLElement) сеттер, который устанавливает элемент сожержимого внутрь контейнераю
    open() открытие модального окна
    close() закрытие модального окна


#### Класс Sucsess 
Отвечает за отображение информации об успешном заказе.

Интерфейс:

    interface ISuccess { 
        total: number; }

Конструктор класса:
    constructor(container: HTMLElement, events: IEvents){}

Поля класса:
    successDescription: HTMLElement отображение количества списанных синапсов
    successButton: HTMLButtonElement кнопка успешного заказа
    

Методы класса: 

    set total(value: number) устанавливает сумму синапсов для отображения

#### Класс Card
Родительский класс для классов CardCatalog CardView CardCart. Отображает информацию о товаре.


Конструктор класса:
    constructor(container: HTMLElement){}

Поля класса:
    titleElement: HTMLElement  элемент для названия товара
    priceElement: HTMLElerment  элемент для цены товара

Методы класса: 
    set title(value: string) устанавливает наименование в карточку 
    set price(value: number) устанавливает цену в карточку, при null выводится - Бесценно
  




#### Класс CardCatalog
Наследник класса Card. Отображение карточки в каталоге. 
Событие при нажатии на карточку.
Обработка клика через callback для открытия preview


Конструктор класса:
    constructor(container: HTMLElement, events: IEvents) {}

Поля класса:
    imageElement: HTMLImageElement   изображение для товара
    categoryElement: HTMLElement     категория товара
    А также наследуются поля от родительского класс Card

Методы класса: 
    set image(url: string) сеттер устанавливает изображение
    set category(value: string) сеттер устанавливает категорию с добавлением класс categoryMap




#### Класс CardPreview
Наследний класса Card. Отображает информацию о товаре в модальном окне preview. 


Интерфейс:
interface ICardPriview extends ICard {
    category: string;
    image: string;
    description: string;
    buttonText: string;
}

Конструктор класса:
constructor(container: HTMLElement, onBasketClick?: ()=> void) {} 

Поля класса:
    imageElement: HTMLImageElement   изображение для товара
    categoryElement: HTMLElement     категория товара
    buttonElement: HTMLButtonElement кнопка для добавления товара в корзину
    descriptionElement: HTMLElement описание товара
  


Методы класса: 
    set image(value: string) сеттер для изображения
    set category(value: string) сеттер категории
    set description(value: string) сеттер для описания
    set buttonDescription(value:string) сеттер для описания кнопки
    set disabled(value: boolean) блокировка кнопки


#### Класс CardBasket
Наследник класса Card. Отвечает за отображение карточки в корзине.

Интерфейс:
 interface ICardBasket extends ICard {
    index: number;
 }

Конструктор класса:
    constructor(container: HTMLElement, onDeleteClick?: ()=> void) {}

Поля класса:
    buttonDeleteElement: HTMLButtonElement кнопка удаления товара
    indexElemet: HTMLElement порядковый номер товара
Методы класса: 
    set index(value: number) обновляет номер товара.




#### Класс Basket
Отвечает за отображение товаров в корзине и управление кнопкой оформления заказа.

Интерфейс:
    interface IBasket{
        basketList: HTMLElement[];
        total: number
    }

Конструктор класса:
    constructor(container: HTMLElement, events: IEvents) {}
    
Поля класса:
    basketListElement: HTMLElement элемент для отображения списка товаров, находящихся в корзине
    basketButtonElement: HTMLButtonElement для отображения кнопки оформления заказа.
    totalPriceElement: HTMLElement для отображения  итоговой цены в корзине

Методы класса: 
    set basketList(items: HTMLElement[]) сеттер для списка товаров, обновление списка
    set total(value: number) сеттер общей стоимости покупки
    set isButtonDisables(value: boolean) вкл и выкл активности кнопки





#### Класс Form
Родительский класс для всех форм

Интерфейс: 
     interface IForm {
     errors: string;
    }

Конструктор класса:
    constructor(container: HTMLElement) {
    }

Поля класса:
    formButtonElement: HTMLButtonElement; элемент для кнопки отправки формы
    formErrorElement: HTMLElement; элемент для текста ошибки формы

Методы класса: 
    set errors(value: string); сеттер для текста ошибок формы
    set isButtonDisabled(value:boolean) кнопка формы 


#### Класс OrderForm
Отвечает за отображение формы заказа. Наследует функционал класса Form

Конструктор класса:
    constructor(container: HTMLElement, events: IEvents) {}


Поля класса:
    cardButtonElement: HTMLButtonElement  элемент кнопки оплаты картой
    cashButtonElement: HTMLButtonElement  элемент кнопки оплаты наличными
    inputElement: HTMLInputElement элемент поля для адреса доставки


Методы класса: 

    set paymentType(value: TPayment) переключение способа оплаты
    set address(value: string) сеттер для адреса
    togglePayment(payment: TPayment) внутренний метод для смены способа оплаты



#### ContactForm
Наследник класса Form. Отвечает за отображение формы контактных данных пользователя

Конструктор класса:
    constructor(container: HTMLElement, events: IEvents) {}


Поля класса:

    emailInputElement: HTMLInputElement;  элемент для ввода email адреса
    phoneInputElement: HTMLInputElement; элемент для ввода  телефонного номера


Методы класса: 

    set email(value: string ) сеттер для email
    set phone(value: string) сеттер для телефона



#### События моделей
    catalog:changed изменение каталога продуктов
    catalog:preview-changed изменение выбранного продукта
    cart:changed изменение списка товаров в корзине
    buyer:changed изменение данных покупателя





#### Презентер
Связывает слои: слой моделей, слой View и API. 
Используются события EventEmitter




#####  События моделей
- загрузка товаров с сервера (weblarekAPI.getProducts()) в Catalog
- catalog:changed -рендер (Gallery)
- cart:changed обновление корзины
- product:selected продукт выбран
- buyer:chamged  обновление информации о покупателе в формах

##### События представлений
- catalog:preview-changed  клик по карточке товара
- preview:button-click клик по кнопке превью
- basket:open открытие корзины товаров
- modal:close  закрытие модального окна
- orderForm:open открытие формы заказа
- orderForm:submit отправка формы заказа
- orderForm:field-changed изменение содержимого формы заказа
- contactForm:submit отправка формы контактов
- contactForm:field-changed изменение содержимого формы контактов
- modal:close  закрытие модального окна
