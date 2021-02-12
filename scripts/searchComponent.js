export default Vue.component('search', {
    data: () =>{
        return {
            searchLine: ""
        }
    },
    template: `
        <div class="search-form">
            <input type="text" class="search-field" v-model="searchLine" @keydown="alsoFilter($event)">
            <button class="btn-search" @click="filterGoods()">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    `,
    methods: {
        alsoFilter(event){
            if (event.keyCode == 13) {
                this.filterGoods();
            }
        },

        filterGoods(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.$root.filtered = this.$root.products.filter(product => regexp.test(product.product_name));
            this.$root.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);

                if(!this.$root.filtered.includes(el)){
                    block.classList.add('hidden-screen');
                } else {
                    block.classList.remove('hidden-screen');
                }
            });
            if (this.$root.filtered.length == 0){
                this.$root.errorExist = true;
                this.$root.errorText = `Простите, мы ничего не нашли`;
            }
        }
    }
});