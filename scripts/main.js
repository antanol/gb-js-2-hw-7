// чтобы sass-loader корректно работал, указываем путь до файла scss
import '../style/main.scss';

const app = new Vue({
    el: '#app',
    components: {
        'catalog-page': () => import('./productsComponent.js'),
        'basket': () => import('./basketComponent.js'),
        'search': () => import('./searchComponent.js'),
        'error': () => import('./errorComponent.js')
    },
    data: {
        localLinkData: {
            catalogData: "../db/catalogData.json",
            getBasket: "../db/getBasket.json"
        },
        products: [],
        filtered: [],
        
        showBasket: false,
        basketContent: {
            amount: 0,
            countGoods: 0,
            content: []
        },

        errorExist: false,
        errorText: ""
    },
    methods: {
        checkAmount(){
            let temp_count = 0;
            for (let elem of this.basketContent.content){
                temp_count += elem.price * elem.quantity;
            }
            this.basketContent.amount = temp_count;
        }
    },
    mounted(){
        // аналог window.onload

        fetch(this.localLinkData.catalogData)
            .then(result => {
                result.json()
                .then(data => {
                    this.products = [...data];
                })
            })
            .catch(err => {
                this.errorExist = true;
                this.errorText = `Что-то пошло не так... Простите, но мы не смогли найти товары. Пожалуйста, зайдите позже!`
            });

        fetch(this.localLinkData.getBasket)
            .then(result => {
                result.json()
                .then(data => {
                    this.basketContent.content = data.contents;
                    this.basketContent.amount = data.amount;
                    this.basketContent.countGoods = data.countGoods;
                })
            })
            .catch(err=>{
                // если файл не найден, генерируем пустую корзину
                this.basketContent.content = [];
                this.basketContent.amount = 0;
                this.basketContent.countGoods = 0;
            });
    }
});