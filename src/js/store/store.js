import axios from 'axios';
import Vue from 'vue';
import nanoid from 'nanoid';

const state = {

    completed: {},

    checklists: {}

};

const actions = {

    loadChecklists({commit}) {
        new Promise((resolve, reject) => {
            axios.get('/api.php/checklist').then(({data}) => {
                console.log(data);

                commit('setChecklists', data);
                resolve();
            })
        })
    },

    saveChecklist({commit}, {checklist}) {
        new Promise((resolve, reject) => {
            axios.post('/api.php/checklist', checklist).then(({data}) => {
                console.log(data);

                resolve();
            })
        })
    },

    loadCompleted({commit}) {
        new Promise((resolve, reject) => {
            axios.get('/api.php/completed').then(({data}) => {
                console.log(data);

                commit('setCompleted', data);
                resolve();
            })
        })
    },

    saveCompleted({commit}, {checklist}) {

        checklist.completed_at = parseInt((new Date()).getTime() / 1000);

        new Promise((resolve, reject) => {
            axios.post('/api.php/completed', checklist).then(({data}) => {
                console.log(data);

                commit('addCompleted', checklist);

                resolve();
            })
        })
    }
};
const mutations = {

    setChecklists(state, checklists) {
        const c = {};

        checklists.forEach(i => {
            c[i.id] = i;
        });


        Vue.set(state, 'checklists', c);
    },

    setCompleted(state, checklists) {
        const c = {};

        checklists.forEach(i => {
            c[i.id] = i;
        });


        Vue.set(state, 'completed', c);
    },

    addCompleted(state, checklist) {
        Vue.set(state.completed, checklist.id, checklist);
    },

    addChecklist(state, checklist) {
        Vue.set(state.checklists, checklist.id, checklist);
    },

    updateChecklist(state, {id, field, value}) {
        Vue.set(state.checklists[id], field, value);
    },


    addChecklistItem(state, {id}) {
        const item = {
            id: nanoid(),
            title: ''
        };

        state.checklists[id].items.push(item);
    },

    removeChecklistItem(state, {id, itemId}) {
        const item = state.checklists[id].items.find(e => e.id === itemId);
        state.checklists[id].items.splice(
            state.checklists[id].items.indexOf(item),
            1
        );
    },

    updateChecklistItem(state, {id, itemId, field, value}) {
        const item = state.checklists[id].items.find(e => e.id === itemId);
        Vue.set(item, field, value);
    }

};

const getters = {

    completed: state => Object.values(state.completed)
};


export default {state, actions, mutations, getters};