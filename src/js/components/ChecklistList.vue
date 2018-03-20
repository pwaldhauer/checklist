<template>


    <div>
        <h2>Checklisten</h2>
        <ul class="list-group mb-5">
            <li v-for="list in checklists" class="list-group-item">
                <div class="row">
                    <div class="col-sm-8">   {{list.title}}</div>
                    <div class="col-sm-4">
                        <button @click.prevent="edit(list.id)" class="btn btn-secondary">Editieren</button>
                        <button @click.prevent="complete(list.id)" class="btn btn-primary">Ausfüllen</button>
                    </div>
                </div>



            </li>
        </ul>


        <h2>Ausgefüllte Checklisten</h2>

        <ul class="list-group">
            <li v-for="list in completed" class="list-group-item">{{list.completed_at}} – {{list.title}} – von {{list.completer}}</li>
        </ul>

    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'ChecklistList',

        computed: {
            checklists() {
                return this.$store.state.checklists;
            },

            completed() {
                console.log(this.$store.getters.completed);

                return this.$store.getters.completed.map(c => {
                    return {
                        ...c,
                        title: this.$store.state.checklists[c.checklistId].title,
                        completed_at: moment.unix(c.completed_at).format()
                    }
                });
            }
        },

        methods: {
            edit(id) {
                this.$router.push({name: 'edit', params: {id}});
            },

            complete(id) {
                this.$router.push({name: 'complete', params: {id}});
            }
        },
    }
</script>
