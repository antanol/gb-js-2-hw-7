export default Vue.component('search', {
    props: ['flag', 'text'],
    template: `
        <div v-if="flag" class="error">
            {{this.errorText}}
            {{text}}
        </div>
    `
});