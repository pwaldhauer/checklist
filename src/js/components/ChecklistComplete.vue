<template>


    <div>
        <h2>{{checklist.title}}</h2>

        <div class="form-group">
            <label for="completer">Ausfüller</label>
            <input id="completer" class="form-control" type="text" v-model="check.completer">
        </div>


        <div v-for="item in check.items" class="form-group">

            <div class="form-check form-check-inline">
                <input :id="item.title" type="checkbox" class="form-check-input" v-model="item.checked">
                <label class="form-check-label" :for="item.title">{{item.title}}</label>
            </div>
        </div>


        <div>
            <button @click="save" class="btn btn-primary">Speichern</button>
        </div>


    </div>

</template>

<script>

    import nanoid from 'nanoid';

    export default {
        name: 'ChecklistComplete',

        data: function () {
            return {
                check: {
                    completer: '',
                    items: [],
                },
            }
        },

        computed: {
            checklist() {
                return this.$store.state.checklists[this.$route.params.id];
            }
        },

        methods: {
            updateItem(id, value) {

                console.log(id, value);
                // this.$router.push({name: 'edit', params: {id}});
            },

            save() {

                this.$store.dispatch('saveCompleted', {
                    checklist: {
                        id: nanoid(),
                        checklistId: this.checklist.id,
                        items: this.check.items,
                        completer: this.check.completer
                    }
                }).then(() => {
                    this.$router.go(-1);
                })

            }

        },

        mounted() {
            this.checklist.items.forEach(e => {
                const i = {
                    title: e.title,
                    checked: false,
                };

                this.check.items.push(i);
            })
        }
    }
</script>
