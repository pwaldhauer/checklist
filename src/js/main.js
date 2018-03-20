import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
Vue.use(VueRouter);

import draggable from 'vuedraggable';

import storage from './store/store';
import nanoid from 'nanoid';

/*
import BoxImage from './components/BoxImage.vue';
import BoxText from './components/BoxText.vue';
import Section from './components/Section.vue';
import Sidebar from './components/Sidebar.vue';


import Dropzone from './components/Dropzone.vue';


*/

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


new Vue({
    el: '#app',
    store,
    router,
    data: {},

    computed: {},
    components: {
        draggable,

    },

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