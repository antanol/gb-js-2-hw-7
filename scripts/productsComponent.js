Vue.component('product-item', {
    props: ['item', 'my_id'], 
    template: `
        <div class="product-item" :data-id="my_id">
            <img src="http://placehold.it/150x200">
            <h4>{{item.product_name}}</h4>
            <div class="price">{{item.price}} рублей</div>
            <button :data-id="item.id_product" class="btnMinus" @click="decrementNum($event)">-</button>
            <input :data-id="item.id_product" type="number" name="nunProd" value="1">
            <button :data-id="item.id_product" class="btnPlus" @click="incrementNum($event)">+</button><br>
            <button :data-id="item.id_product" class="btnBuyIt" @click="putInBasket($event)">Купить</button>
        </div>`,
    methods: {
        incrementNum(event){
            let field = document.querySelector(`input[data-id="${event.target.dataset.id}"]`);
            let currentNum = Number(field.value);
            currentNum++;
            field.value = currentNum;
        },

        decrementNum(event){
            let field = document.querySelector(`input[data-id="${event.target.dataset.id}"]`);
            let currentNum = Number(field.value);
            if (currentNum > 1){
                currentNum--;
            }
            field.value = currentNum;
        },
        
        putInBasket(event){
            let eventID = Number(event.target.dataset.id);
            let newNum = Number(document.querySelector(`input[data-id="${eventID}"]`).value);

            let alreadyExist = this.$root.basketContent.content.find(item => item.id_product == eventID);
            if (alreadyExist){
                alreadyExist.quantity += newNum;
                this.$root.basketContent.content.countGoods += newNum;
            }else{
                let newElem = this.products.find(item => item.id_product == eventID);
                newElem.quantity = newNum;
                this.$root.basketContent.content.push(newElem);
            };
            this.$root.checkAmount();
        }
    }
});

export default Vue.component('catalog-page', {
    props: ['products'], 
    template: `
        <div id="catalog">
            <product-item 
                v-for="product of products" 
                :key="product.id_product" 
                :item="product"
                :my_id="product.id_product">
            </product-item>
        </div>`
});