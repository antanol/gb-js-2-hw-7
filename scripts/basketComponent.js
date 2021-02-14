// import writeHistory from './writeHistory.js';

Vue.component('product-short', {
    props: ['item'], 
    template: `
        <div class="basket-item">
            <i class="fa fa-times" aria-hidden="true" title="удалить из корзины" :data-id="item.id_product" @click="deleteItem($event)"></i>
            <img src="http://placehold.it/50x50">
            <b>{{item.product_name}}</b>
            <div class="price">{{item.quantity}} шт. на {{item.price*item.quantity}} рублей</div>
        </div>
        `,
    methods: {
        deleteItem(evt){
            let deleteThis = evt.target.dataset.id;
            let deleteIndex = this.$root.basketContent.content.findIndex(item => item.id_product == deleteThis);
            // для записи в статистику фиксируем объект
            let deleteObj = this.$root.basketContent.content.findIndex(item => item.id_product == deleteThis);
            
            this.$root.basketContent.content.splice(deleteIndex, 1);
            this.$root.checkAmount();

            // let fix = {
            //     action: "delete",
            //     id_product: deleteObj.id_product,
            //     num_product: deleteObj.quantity
            // }
            // writeHistory(JSON.stringify(fix));
        }
    }
});

export default Vue.component('basket', {
    props: ['products'],
    data: () =>{
        return {
            showBasket: false
        }
    },
    template: `
        <div class="basket">
            <i class="fa fa-shopping-cart" aria-hidden="true" @click="showBasket = !showBasket"></i>
            <div class="basketContent" @click="showBasket = !showBasket"> {{ this.$root.basketContent.amount }} рублей</div>
            <div class="basketList" v-if="showBasket">
                <p v-if="this.$root.basketContent.amount == 0">Ваша корзина пуста</p>
                
                <product-short 
                    v-for="elem of this.$root.basketContent.content"
                    :item="elem" 
                    :key="elem.id_product"
                ></product-short>
            </div>
        </div>
        `
});