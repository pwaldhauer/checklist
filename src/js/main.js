import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);

import storage from './store/store';
import nanoid from 'nanoid';

import ChecklistForm from './components/ChecklistForm.vue';
import ChecklistComplete from './components/ChecklistComplete.vue';
import ChecklistList from './components/ChecklistList.vue';

const store = new Vuex.Store({
    ...storage,
    strict: true,
    plugins: [
        //    createPersistedState(),
    ]
});

const router = new VueRouter({
    routes: [
        {path: '/', component: ChecklistList},
        {name: 'edit', path: '/edit/:id', component: ChecklistForm},
        {name: 'complete', path: '/complete/:id', component: ChecklistComplete},
    ]
});
/*
router.beforeEach((to, from, next) => {
    // quickfix for detail pages
    store.dispatch('loadChecklists').then(() => {
        next();
    });
});
*/

new Vue({
    el: '#app',
    store,
    router,
    data: {},

    computed: {},
    components: {},

    methods: {
        newChecklist() {
            const checklist = {
                id: nanoid(),
                title: '',
                creator: '',
                items: []
            };

            this.$store.commit('addChecklist', checklist);
            this.$router.push({name: 'edit', params: {id: checklist.id}});
        }
    },

    mounted() {
        this.$store.dispatch('loadChecklists');
        this.$store.dispatch('loadCompleted');
    }
});